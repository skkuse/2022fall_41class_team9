import os
import sys
from auditor import AuditCode

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
