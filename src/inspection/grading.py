import os
import util
from decorator import temp_py_handler

@temp_py_handler(name="temp.py")
def scoring(code, answer, encoding='utf-8', **kwargs):
    fd = kwargs['fd']
    name = kwargs['name']
    fd.write(code)
    os.fsync(fd)
    fd.flush()

    header = util.get_py_execution_header()
    command = util.token2command(header, name)

    user_answer = util.execute_shell_command(command, encoding=encoding)
    user_answer = user_answer.strip('\n')
    
    """
    여기부터 다시 또 개발
    """

if __name__ == "__main__":
    fd = open("code_error.py", "r")
    code = fd.read()
    fd.close()

    print("================================")
    print(scoring(code, 3, "cp949"))
    print("================================")
    #print(util.execute_shell_command("python temp.py", "cp949"))