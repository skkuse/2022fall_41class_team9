import os

class TestFileManager:
    #file includes both dir and file
    def __init__(self, files):
        self.test_files = [member for member in files if os.path.isfile(member)]
        self.test_dirs = [member for member in files if os.path.isdir(member)]

    def add_file(self, file):
        if os.path.isdir(file):
            self.test_dirs.append(file)
        elif os.path.isfile(file):
            self.test_files.append(file)

    def del_file(self, file):
        if os.path.isdir(file):
            self.test_dirs.remove(file)
        elif os.path.isfile(file):
            self.test_files.remove(file)

    def change_files(self, files):
        self.test_files = [member for member in files if os.path.isfile(member)]
        self.test_dirs = [member for member in files if os.path.isdir(member)]
