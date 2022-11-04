import util
import json
from file import TestFileManager

BASECOMMAND = "multimetric"

class MultiMetric(TestFileManager):
    #multimetric tests only files not dirs
    #if no files do nothing
    def __init__(self, files):
        super().__init__(files)
        self.build_metric()

    def build_metric(self):
        command = util.build_command(BASECOMMAND, *self.test_files)
        multi_metric = util.execute_shell_command(command)
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

if __name__ == "__main__":
    files = ['efficiency_test/free.py','efficiency_test/test_long.py','test.py']
    mm = MultiMetric(files)
    mm.add_file("efficiency_backup.py")
    mm.del_file("test.py")
    print(mm.multi_metric, type(mm.multi_metric))
    print("--------------------------------------------")
    print(mm.overall())
    print("--------------------------------------------")
    print(mm.halstead_difficulty())