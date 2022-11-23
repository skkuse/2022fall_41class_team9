import os
import util
import sys
import math
import time
import importlib
from wrapper import temp_py_handler

class Runner:
    def __init__(self, code, encoding="utf-8"):
        self.outputs = []
        self.code = code
        self.encoding = encoding

    @temp_py_handler(file="runner_temp_script.py")
    def run_script(self, **kwargs):
        fd = kwargs['fd']
        file = kwargs['file']
        fd.write(self.code)
        os.fsync(fd)
        fd.flush()

        header = util.get_py_execution_header()
        command = util.token2command(header, file)

        start = time.time()
        out = util.execute_shell_command(command, encoding=self.encoding)
        out = out.strip('\n')
        end = time.time()

        run_time = math.floor((end-start)*1000.*1000.)
        self.outputs.append({"runtime":run_time, "output":out})

        return out        

    @temp_py_handler(file="runner_temp_soln.py")
    def run_soln(self, *params, **kwargs):
        fd = kwargs["fd"]
        file = kwargs["file"]
        name = file[:file.index('.')]
        fd.write(self.code)
        os.fsync(fd)
        fd.flush()

        start = time.time()
        answer = importlib.import_module(name)
        out = answer.solution(*params)
        end = time.time()

        run_time = math.floor((end-start)*1000.*1000.)
        self.outputs.append({"runtime":run_time, "output":out})

        return out

    def run_existing_soln(self, file, *params):
        name = file[:file.index('.')]

        start = time.time()
        answer = importlib.import_module(name)
        out = answer.solution(*params)
        end = time.time()

        run_time = math.floor((end-start)*1000.*1000.)
        self.outputs.append({"runtime":run_time, "output":out})

        return out        


if __name__ == "__main__":
    fd = open("code/code_no_error.py", "r")
    code = fd.read()
    fd.close()
    runner = Runner(code, "cp949")
    out = runner.run_soln()
    print("================================")
    print(out)
    print("================================")


'''
@temp_py_handler(file="temp_terminal.py")
def executing_terminal(code, encoding="utf-8", **kwargs):
    """
    execute code
    ----------------------------------------------------
    input= 
        code(string)
    ----------------------------------------------------
    return=
        output(string)
    ----------------------------------------------------
    note
        - @temp_py_handler는 함수 실행 전에 코드를 저장할 임시 파일을 만듭니다. 그리고 함수 실행 후 임시 파일을 지웁니다.
        - 코드에 fd, name을 kwargs로부터 가져오는 부분이 있는데 fd, name은 데코레이터로부터 자동으로 만들어집니다
    """

    fd = kwargs['fd']
    file = kwargs['file']
    fd.write(code)
    os.fsync(fd)
    fd.flush()

    header = util.get_py_execution_header()
    command = util.token2command(header, file)

    out = util.execute_shell_command(command, encoding=encoding)
    out = out.strip('\n')

    return out

@temp_py_handler(file="temp_func.py")
def executing_function(code, encoding='utf-8', **kwargs):
    fd = kwargs['fd']
    fname = kwargs['file'][:-3]
    fd.write(code)
    os.fsync(fd)
    fd.flush()

    exec(f"from {fname} import *")

    return temp_func.solution()
'''