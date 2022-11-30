from .utils.util import token2command, execute_shell_command, command2token
from .utils.file import TestFileManager
import json

BASECOMMAND = "multimetric"

class MultiMetric(TestFileManager):
    """    
    """
    def __init__(self, files, encoding='utf-8'):
        super().__init__(files)
        self.encoding = encoding
        self.multi_metric = None
        self.build_metric()

    def build_metric(self):
        if len(self.test_files) > 0:
            command = token2command(BASECOMMAND, *self.test_files)
            multi_metric = execute_shell_command(command2token(command), self.encoding)
            self.multi_metric = json.loads(multi_metric) #json

    def overall(self):
        """
        return summarized multimetric for all files
        ------------------------------------------------------
        output=
            metric(json): json type overall metric
        """
        return self.multi_metric['overall']

    def halstead_difficulty(self):
        """
        return halstead difficulty for each file
        can calculate code efficiency through halstead difficulty
        ------------------------------------------------------
        output=
            difficulty(dict): difficulty for each file
        """
        difficulty = [stat['halstead_difficulty'] for stat in self.multi_metric['files'].values()]
        diffculty_each = dict(zip(self.test_files, difficulty))
        return diffculty_each

    def add_file(self, file):
        super().add_file(file)
        self.build_metric()

    def del_file(self, file):
        super().del_file(file)
        self.build_metric()

    def change_files(self, files):
        super().change_files(files)
        self.build_metric()