import os
import sys
from auditor import AuditCode
from threading import Thread
import functools

def temp_py_handler(file):
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
            os.remove(file)
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