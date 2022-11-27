import os
import sys
from .auditor import AuditCode
from threading import Thread
import functools
import traceback

def temp_py_handler_trace(file):
    def decorator(func):
        #print("create file")
        def wrapper(*args, **kwargs):
            fd = open(file, "w")
            fd.write(AuditCode.input_audit())
            kwargs['fd'] = fd
            kwargs['file'] = file
            error_line = None
            try:
                out = func(*args, **kwargs)
            except Exception as e:
                _, _, error_traceback = sys.exc_info()
                out = traceback.format_exc()
                print("error_traceback")
                error_line = error_traceback.tb_lineno
            fd.close()
            os.remove(file)
            return out, error_line
        return wrapper
    return decorator

def temp_py_handler_error(file):
    def decorator(func):
        #print("create file")
        def wrapper(*args, **kwargs):
            fd = open(file, "w")
            fd.write(AuditCode.input_audit())
            kwargs['fd'] = fd
            kwargs['file'] = file

            try:
                out = func(*args, **kwargs)
            except Exception as e:
                out = str(type(e)) + "\n"
                out += str(e)
            #print("delete file")
            fd.close()
            #os.remove(file)
            return out
        return wrapper
    return decorator

def comp_temp_py_handler(file, comp_code_header):
    def decorator(func):
        def wrapper(code, comp_codes,*args, **kwargs):
            fd = open(file, "w")
            fd.write(code)
            os.fsync(fd)
            fd.flush()
            
            comp_fds = []
            comp_files = []
            for idx, comp_code in enumerate(comp_codes):
                fd_temp = open(f"{comp_code_header}{idx}.py","w")
                fd_temp.write(comp_code)
                os.fsync(fd_temp)
                fd_temp.flush()
                comp_fds.append(fd_temp)
                comp_files.append(f"{comp_code_header}{idx}.py")
            
            #fd.write(AuditCode.input_audit())
            kwargs['file'] = file
            kwargs['comp_files'] = comp_files

            try:
                out = func(code, comp_codes, *args, **kwargs)
            except Exception as e:
                out = str(type(e)) + "\n"
                out += str(e)

            fd.close()
            os.remove(file)
            for comp_fd, comp_file in zip(comp_fds, comp_files):
                comp_fd.close()
                os.remove(comp_file)

            return out
        return wrapper
    return decorator

def timeout(timeout):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            res = [TimeoutError(f'TimeoutError: function "{func.__name__}" exceeds timeout {timeout} seconds')]
            def newFunc():
                try:
                    res[0] = func(*args, **kwargs)
                except Exception as e:
                    res[0] = e
            t = Thread(target=newFunc)
            t.daemon = True
            try:
                t.start()
                t.join(timeout)
            except Exception as je:
                print ('error starting thread')
                raise je
            ret = res[0]
            if isinstance(ret, BaseException):
                raise ret
            return ret
        return wrapper
    return decorator