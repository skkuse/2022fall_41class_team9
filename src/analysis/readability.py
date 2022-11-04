import util
import re
from file import TestFileManager

BASECOMMAND = "pylama"

class Auditor(TestFileManager):
    def __init__(self, files):
        super().__init__(files)
        self.linters = ['eradicate','mccabe','mypy','pycodestyle','pydocstyle','pyflakes','pylint','isort']
        self. = {}
        self.analyze() #dict where <file name>:tuple

    def analyze(self):
        subject = [file for file in self.test_files if file not in self.analysis.keys()]
        if len(subject) > 0:
            for linter in self.linters:
                command = util.build_command(BASECOMMAND, *subject, "-l", linter)
                audit_report

        
    def get_result()

    def add_file(self, file):
        super().add_file(file)
        self.analyze()

    def del_file(self, file):
        super().del_file(file)
        self.analyze()

    def change_files(self, files):
        super().change_files(files)
        self.analyze()