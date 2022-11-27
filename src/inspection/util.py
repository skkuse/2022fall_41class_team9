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

def is_empty(lst):
    return len(lst) == 0