import os
import math
import re
import time
import importlib
import tempfile
import sys
from .utils.util import get_py_execution_header, token2command, execute_shell_command
from .utils.wrapper import error_trace_handler,error_type_handler, timeout
from .utils.auditor import AuditCode

LOCAL_TIMEOUT = 10
FUNC_NAME = "solution"

class Runner:
    def __init__(self, code, encoding="utf-8"):
        self.outputs = []
        self.code = code
        self.encoding = encoding

    @error_trace_handler()
    @timeout(LOCAL_TIMEOUT)
    def run_script(self, **kwargs):
        out = None
        with tempfile.NamedTemporaryFile(mode="w", suffix='.py', delete=False) as temp_file:            
            temp_file.write(AuditCode.input_audit())
            temp_file.write(self.code)
            temp_file.seek(0)
            
            header = get_py_execution_header()
            command = [header, temp_file.name]
            
            start = time.time()
            out = execute_shell_command(command, encoding=self.encoding)
            out = out.strip('\n')
            end = time.time()  

            run_time = math.floor((end-start)*1000.*1000.)
            self.outputs.append({"runtime":run_time, "output":out})
        
        os.remove(temp_file.name)

        return out         

    @error_type_handler()
    @timeout(LOCAL_TIMEOUT)
    def run_soln(self, *params, **kwargs):
        with tempfile.NamedTemporaryFile(mode='w+t', suffix='.py', delete=False) as temp_file:
            temp_file.write(AuditCode.input_audit())
            temp_file.write(self.code)
            temp_file.seek(0)

            spec = importlib.util.spec_from_file_location(FUNC_NAME, temp_file.name)
            foo = importlib.util.module_from_spec(spec)
            sys.modules[FUNC_NAME] = foo
            spec.loader.exec_module(foo)

            start = time.time()
            print("hello")
            out = foo.solution(*params)
            end = time.time()

            run_time = math.floor((end-start)*1000.*1000.)
            self.outputs.append({"runtime":run_time, "output":out})

        os.remove(temp_file.name)

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

"""
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