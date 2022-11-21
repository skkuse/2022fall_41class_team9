import os
import util
from decorator import temp_py_handler

@temp_py_handler(name="temp.py")
def executing(code, encoding="utf-8", **kwargs):
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
    name = kwargs['name']
    fd.write(code)
    os.fsync(fd)
    fd.flush()

    header = util.get_py_execution_header()
    command = util.token2command(header, name)

    out = util.execute_shell_command(command, encoding=encoding)
    out = out.strip('\n')

    return out

if __name__ == "__main__":
    fd = open("code_error.py", "r")
    code = fd.read()
    fd.close()
    out = executing(code, encoding='cp949')
    print("================================")
    print(out)
    print("================================")