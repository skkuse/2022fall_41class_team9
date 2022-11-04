import util
import re
import pandas as pd
from file import TestFileManager

BASECOMMAND = "pylama"

class Auditor(TestFileManager):
    def __init__(self, files, linters=['eradicate','mccabe','mypy','pycodestyle','pydocstyle','pyflakes','pylint','isort']):
        super().__init__(files)
        self.linters = linters
        self.linter_bundle = '"' + ','.join(self.linters) + '"'
        self.report_cols = ["file","line","col","type","content","linter"]
        self.audit_report = pd.DataFrame(columns=self.report_cols)
        self.analyze()

    def analyze(self):
        if len(self.test_dirs)+len(self.test_files) > 0:
            command = util.build_command(BASECOMMAND, *self.test_dirs, *self.test_files, "-l", self.linter_bundle)

            audit_result = util.execute_shell_command(command)
            #parse result by regex & append to audit report
            expression = r"(?P<file>.+):(?P<line>\d+):(?P<col>\d+)\s+(?P<type>[\w]+)\s(?P<content>.+)\s+\[(?P<linter>\w+)\]\n?"
            regex = re.compile(expression)
            parsed_result = regex.findall(audit_result)
            #update
            self.audit_report = pd.concat([self.audit_report, pd.DataFrame(parsed_result, columns=self.report_cols)], axis=0)
            self.audit_report = self.audit_report.drop_duplicates()

    def get_report_by_file(self, file):
        return self.audit_report[self.audit_report['file']==file].values

    def get_report_by_linter(self, linter):
        return self.audit_report[self.audit_report['linter']==linter].values

    def add_file(self, file):
        super().add_file(file)
        self.analyze()

    def del_file(self, file):
        super().del_file(file)
        self.analyze()

    def change_files(self, files):
        super().change_files(files)
        self.analyze()

if __name__=="__main__":
    auditor = Auditor(['tests','refers'])
    print(auditor.test_dirs)
    print(auditor.linter_bundle)
    print(auditor.audit_report)
