from .utils.auditor import AuditCode
from .utils.util import flatten_list
from .memory_profile import get_memory_profile
from .efficiency import MultiMetric
from .execution import Runner
from .grading import Tester
from .plagiarism import Detector
from .readability import Auditor
import io
import sys
import os
import json
import re
import traceback
import tempfile

LOCAL_TIMEOUT = 10

"""
만약 encoding 관련 오류 발생 시 encoding = "cp949"로 변경
"""

def get_execution_result(user_code, encoding='utf-8', **kwargs):
    """
    실행 버튼 클릭에 대한 실행 결과
    refactoring: exec를 이용해 코드를 실행하는 방식 이용 -> encoding으로 인한 오류 없음
    ------------------------------------------------------
    input=
        user_code(string): 유저가 제출한 코드
    ------------------------------------------------------
    output=
        output(string):  실행 결과. print statement or error message
        error_line(int): 에러가 발생한 라인 위치. 만약 에러가 발생하지 않으면 None
    ------------------------------------------------------
    e.g.
    """
    runner = Runner(user_code)
    output = runner.run_script()
    error_line = -1

    error_expression = r"[a-zA-Z]+Error: .+"
    error_regex = re.compile(error_expression)
    is_error = len(error_regex.findall(output)) > 0

    if "raise ret\nTimeoutError" in output:
        output = "TimeoutError: script exceeds timeout 10 seconds\n"
        error_line = -1
    elif is_error:
        correction = 0
        expression = r'File .+, line (?P<line>\d+)'
        regex = re.compile(expression)
        for m in regex.finditer(output):
            match_line = int(m.groupdict()['line'])
            error_line = match_line - 6
            
            line_start = m.start(1) - correction
            line_end = m.end(1) - correction
            output = output[:line_start] + str(error_line) + output[line_end:]

            correction = len(str(match_line)) - len(str(error_line))

    return output, error_line
    
def get_grading_result(user_code, tc_open_input, tc_open_output, tc_close_input, tc_close_output):
    """
    채점 or 제출 버튼 클릭에 대한 채점 결과
    ------------------------------------------------------
    input=
        user_code(string): 유저가 제출한 코드
        tc_open_input(list<?>): 오픈 테스트케이스 인풋
        tc_open_output(list<?>): 오픈 테스트케이스 정답
        tc_close_input(list<?>): 클로스 테스트케이스 인풋
        tc_close_output(list<?>): 클로스 테스트케이스 아웃풋
    ------------------------------------------------------
    output=
        result(json):  실행 결과
    ------------------------------------------------------
    e.g.
    """
    tester_open = Tester(user_code, tc_open_input, tc_open_output, True, 1)
    tester_close = Tester(user_code, tc_close_input, tc_close_output, False, len(tc_open_input)+1)
    report_open = tester_open.run()
    report_close = tester_close.run()
    output = report_open + report_close

    return output
    
def get_efficiency_analysis(user_code, tc_open_input, encoding='utf-8', **kwargs):
    """
    제출 코드에 대한 efficiency 분석 결과
    ------------------------------------------------------
    input=
        user_code(string): 유저가 제출한 코드
        tc_open_input(list): memory profiler에 쓸 open test case
        encoding(string): 가끔 encoding에 의한 오류가 생기는데 이때 encoding을 cp949로 변경
    ------------------------------------------------------
    output=
        output(json):  rfficiency 분석 결과
    ------------------------------------------------------
    e.g.
    """

    output = {}
    with tempfile.NamedTemporaryFile(mode='w+t', suffix='.py', delete=False) as temp_file:
        temp_file.write(user_code)
        temp_file.seek(0)

        multi_metric = MultiMetric([temp_file.name], encoding).overall()
        #LOC
        output['LOC'] = user_code.count("\n")
        #Halstead
        output['halstead'] = {aitem:multi_metric[aitem] for aitem in multi_metric.keys() if aitem.startswith("halstead")}
        #control flow complexity(CFC)
        output['CFC'] = multi_metric['cyclomatic_complexity']
        #data flow complexity(DFC) / refactor:mean
        memory_profile_array = get_memory_profile(user_code, tc_open_input[0])
        maximum_memory_usage = max(memory_profile_array)
        output['DFC'] = maximum_memory_usage

    os.remove(temp_file.name)
    #json.dumps(output)
    return output

def get_readability_analysis(user_code, encoding='utf-8', **kwargs):
    """
    제출 코드에 대한 readability 분석 결과
    ------------------------------------------------------
    input=
        user_code(string): 유저가 제출한 코드
        encoding(string): 가끔 encoding에 의한 오류가 생기는데 이때 encoding을 cp949로 변경
    ------------------------------------------------------
    output=
        output(json):  readability 분석 결과
    ------------------------------------------------------
    e.g.
    """
    output = {}
    with tempfile.NamedTemporaryFile(mode='w+t', suffix='.py', delete=False) as temp_file:
        temp_file.write(user_code)
        temp_file.seek(0)
        auditor = Auditor([temp_file.name], encoding)
        output = auditor.audit_report
        output = list(output.values())[0]

    os.remove(temp_file.name)

    return output

def get_plagiarism_score(user_code, past_codes, **kwargs):
    """
    제출 코드에 대한 plagiarism 분석 결과
    코드 복잡도가 낮으면 plagiarism이 0 나옴
    ------------------------------------------------------
    input=
        user_code(string): 유저가 제출한 코드
        past_codes(list<string>): 다른 유저들이 같은 문제에 대해 이전에 제출한 코드
    ------------------------------------------------------
    output=
        output(float):  표절율. 비교 파일 중 가장 높은 값을 리턴
    ------------------------------------------------------
    e.g.
    """
    ref_temp_files = []
    ref_temp_names = []
    for ref_code in past_codes:
        tf = tempfile.NamedTemporaryFile(mode='w+t', suffix='.py', delete=False)
        tf.write(ref_code)
        tf.seek(0)

        ref_temp_files.append(tf)
        ref_temp_names.append(tf.name)
    
    with tempfile.NamedTemporaryFile(mode='w+t', suffix='.py', delete=False) as test_temp_file:
        test_temp_file.write(user_code)
        test_temp_file.seek(0)

        detector = Detector([test_temp_file.name])
        _, similarity = detector.similarity(ref_temp_names)
        flat_similarity = flatten_list(similarity)

        plagiarism_score = max(flat_similarity)

    os.remove(test_temp_file.name)
    for name in ref_temp_names:
        os.remove(name)

    return plagiarism_score