import subprocess as sp
import json
import platform

def token2command(*tokens):
    """
    build terminal command
    ----------------------------------------------------
    input= 
        e.g. build_command("python3", "test.py")
    ----------------------------------------------------
    return=
        command(string)
    ----------------------------------------------------
    """
    command = " ".join(tokens)
    return command

def command2token(command):
    tokens = command.split(" ")
    return tokens
"""
def execute_shell_command(command):
    return sp.getoutput(command)
"""
def execute_shell_command(command, encoding):
    out = None
    try:
        exe = sp.run(command, stdout=sp.PIPE, stderr=sp.PIPE)
        exe.check_returncode()
        out = exe.stdout.decode(encoding=encoding)
    except sp.CalledProcessError as e:
        out = e.stderr.decode(encoding)

    return out

def get_py_execution_header():
    """
    get .py execution header according to OS
    e.g. Linux .py execution header is "python3"
    ----------------------------------------------------
    input=
    ----------------------------------------------------
    return=
        header(string)
    ----------------------------------------------------
    note
    * Only work for windows, linux and mac
    """
    system = platform.system()
    header = None

    if system == "Linux" or system == "Darwin":
        header = "python3"
    elif system == "Windows":
        header = "python"

    return header

def compare_string(str1, str2):
    return str1 == str2

if __name__ == "__main__":
    command = token2command("python", "code_no_error.py")
    tokens = command2token(command)
    print(tokens)
    print(command)
    print("==========================")

    try:
        ls = sp.run(command, stdout=sp.PIPE, stderr=sp.PIPE ) #command에 tokens도 가능
        ls.check_returncode()
        print ( ls.stdout.decode("cp949") )
    except sp.CalledProcessError as e:
        print ( "Error:\nreturn code: ", e.returncode, "\nOutput: ", e.stderr.decode("cp949") )
    print("==========================")
    print(execute_shell_command(tokens, encoding="cp949"))
    print("==========================")
    print(execute_shell_command(command, encoding="cp949"))