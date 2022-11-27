from .analysis import efficiency, readability, plagiarism
from .inspection import execution, grading
from .util.auditor import AuditCode
from .util import wrapper, iterator
from .memory_profile import memory_profile
import io
import sys
import os
import json
import traceback

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
    output = None
    error_line = None

    runner = execution.Runner(user_code, encoding=encoding)
    output, error_line = runner.run_script()

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
    tester_open = grading.Tester(user_code, tc_open_input, tc_open_output, True, 1)
    tester_close = grading.Tester(user_code, tc_close_input, tc_close_output, False, len(tc_open_input)+1)
    
    report_open = tester_open.run()
    report_close = tester_close.run()
    output = report_open + report_close

    return json.dumps(output)
    
@wrapper.temp_py_handler_error(file="temp_efficiency.py")
@wrapper.timeout(LOCAL_TIMEOUT)
def get_efficiency_analysis(user_code, tc_open_input, encoding='utf-8', **kwargs):
    """
    제출 코드에 대한 efficiency 분석 결과
    ------------------------------------------------------
    input=
        user_code(string): 유저가 제출한 코드
        encoding(string): 가끔 encoding에 의한 오류가 생기는데 이때 encoding을 cp949로 변경
    ------------------------------------------------------
    output=
        output(json):  rfficiency 분석 결과
    ------------------------------------------------------
    e.g.
    """
    #write temp file
    fd = kwargs['fd']
    target_file = kwargs['file']
    fd.write(user_code)
    os.fsync(fd)
    fd.flush()

    output = {}
    """multi_metric = efficiency.MultiMetric([target_file], encoding).overall()"""
    #LOC
    output['LOC'] = user_code.count("\n")
    #halstead
    """output['halstead'] = {aitem:multi_metric[aitem] for aitem in multi_metric.keys() if aitem.startswith("halstead")}
    #control flow complexity(CFC)
    output['CFC'] = multi_metric['cyclomatic_complexity']
    #data flow complexity(DFC)
    #mean"""
    memory_profile_array = memory_profile.get_memory_profile(user_code, tc_open_input[0])
    maximum_memory_usage = max(memory_profile_array)
    output['DFC'] = maximum_memory_usage
    return json.dumps(output)

@wrapper.temp_py_handler_error(file="C:/Users/rnwkg/Desktop/2022_software_engineering/2022fall_41class_team9/backend/temp_readability.py")
@wrapper.timeout(LOCAL_TIMEOUT)
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
    #write temp file
    fd = kwargs['fd']
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=")
    print(kwargs['file'])
    new_path = os.getcwd
    new_path = os.path.join(os.getcwd,'temp_readability.py')
    print(new_path)
    print("*******************************************************")
    print(type(kwargs['file']))
    print(fd)
    print("#####################################")
    target_file = kwargs['file']
    fd.write(user_code)
    os.fsync(fd)
    fd.flush()
    print("-------------------------------------------------")
    print(target_file,fd)
    print("-------------------------------------------------")
    output = {}
    auditor = readability.Auditor([target_file], encoding)
    output = auditor.audit_report
    output = output[target_file]

    return json.dumps(output)

@wrapper.comp_temp_py_handler(file="temp_plagiarism.py", comp_code_header="past")
@wrapper.timeout(LOCAL_TIMEOUT)
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
    #write temp file
    target_file = kwargs['file']
    past_files = kwargs['comp_files']

    checker = plagiarism.Detector([target_file])
    _, similarity = checker.similarity(past_files)

    flat_similarity = iterator.flatten_list(similarity)
    plagiarism_score = max(flat_similarity)

    return plagiarism_score
    
"""
    buffer = io.StringIO()
    original_buffer = sys.stdout
    sys.stdout = buffer

    exec(AuditCode.input_audit() + user_code)

    output = buffer.getvalue()
    sys.stdout = sys.__stdout__
    print(output)
    return output
"""