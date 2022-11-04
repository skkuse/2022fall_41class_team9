import subprocess as sp
import json

def build_command(*tokens):
    command = " ".join(tokens)
    return command

def execute_shell_command(command):
    return sp.getoutput(command)
