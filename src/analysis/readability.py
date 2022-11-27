from .file import TestFileManager
from .util import build_command, execute_shell_command
import re

BASECOMMAND = "pylama"

class Auditor(TestFileManager):
    def __init__(self, files, encoding='utf-8', linters=['eradicate','mccabe','mypy','pycodestyle','pydocstyle','pyflakes','pylint','isort']):
        super().__init__(files)
        self.linters = linters
        self.encoding = encoding
        self.linter_bundle = '"' + ','.join(self.linters) + '"'
        self.empty_linter_dict = {linter:[] for linter in self.linters}
        self.audit_report = {}
        self.analyze()

    def analyze(self):
        if len(self.test_dirs)+len(self.test_files) > 0:
            command = build_command(BASECOMMAND, *self.test_dirs, *self.test_files, "-l", self.linter_bundle)
            audit_result = execute_shell_command(command, encoding=self.encoding)
            #parse result by regex & append to audit report
            expression = r"(?P<file>.+):(?P<line>\d+):(?P<col>\d+) (?P<type>\w*) (?P<content>.+) \[(?P<linter>\w+)\]\n?"
            regex = re.compile(expression)
            parsed_result = regex.findall(audit_result)
            #update
            for target_file, _, _, _, content, linter in parsed_result:
                if target_file not in self.audit_report.keys():
                    self.audit_report[target_file] = self.empty_linter_dict
                elif content not in self.audit_report[target_file][linter]:
                    self.audit_report[target_file][linter].append(content)

    def add_file(self, target_file):
        super().add_file(target_file)
        self.analyze()

    def del_file(self, target_file):
        super().del_file(target_file)
        self.analyze()

    def change_files(self, files):
        super().change_files(files)
        self.analyze()