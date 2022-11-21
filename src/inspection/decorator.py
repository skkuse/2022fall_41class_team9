import os

def temp_py_handler(name):
    fd = open(name, "w")
    def decorator(func):
        #print("create file")
        def wrapper(*args, **kwargs):
            kwargs['fd'] = fd
            kwargs['name'] = name
            out = func(*args, **kwargs)
            #print("delete file")
            fd.close()
            os.remove(name)
            return out
        return wrapper
    return decorator
