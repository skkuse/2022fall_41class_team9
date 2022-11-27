import os
import math
import re
import time
import importlib
from .util import get_py_execution_header, token2command, execute_shell_command
from .wrapper import temp_py_handler_error, temp_py_handler_trace, timeout
from .auditor import AuditCode

LOCAL_TIMEOUT = 10

class Runner:
    def __init__(self, code, encoding="utf-8"):
        self.outputs = []
        self.code = code
        self.encoding = encoding

    @temp_py_handler_trace(file="runner_temp_script.py")
    @timeout(LOCAL_TIMEOUT)
    def run_script(self, **kwargs):
        fd = kwargs['fd']
        file = kwargs['file']
        fd.write(self.code)
        os.fsync(fd)
        fd.flush()

        header = get_py_execution_header()
        command = token2command(header, file)
        error_line = None

        start = time.time()
        out = execute_shell_command(command, encoding=self.encoding)
        out = out.strip('\n')
        end = time.time()

        if out.startswith("Traceback"):
            expression = r'File .+, line (?P<line>\d+)'
            regex = re.compile(expression)
            parsed_result = regex.findall(out)
            error_line = int(parsed_result[0])

        run_time = math.floor((end-start)*1000.*1000.)
        self.outputs.append({"runtime":run_time, "output":out})

        return out, error_line

    @temp_py_handler_error(file="runner_temp_soln.py")
    @timeout(LOCAL_TIMEOUT)
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

"""
    @temp_py_handler_trace(file="_.py")
    @timeout(LOCAL_TIMEOUT)
    def run_existing_soln(self, file, *params):
        name = file[:file.index('.')]

        start = time.time()
        answer = importlib.import_module(name)
        out = answer.solution(*params)
        end = time.time()

        run_time = math.floor((end-start)*1000.*1000.)
        self.outputs.append({"runtime":run_time, "output":out})

        return out        

    @temp_py_handler_trace(file="runner_temp_script_exec.py")
    @timeout(LOCAL_TIMEOUT)
    def run_script_exec(self, **kwargs):
        fd = kwargs['fd']
        file = kwargs['file']
        fd.write(self.code)
        os.fsync(fd)
        fd.flush()

        fd_temp = open(file, 'r')
        code = fd_temp.read()
        fd_temp.close()

        buffer = io.StringIO()
        original_buffer = sys.stdout
        sys.stdout = buffer

        start = time.time()
        exec(code)
        end = time.time()

        out = buffer.getvalue()
        sys.stdout = original_buffer

        print(out)

        run_time = math.floor((end-start)*1000.*1000.)
        self.outputs.append({"runtime":run_time, "output":out})

        return out 
"""