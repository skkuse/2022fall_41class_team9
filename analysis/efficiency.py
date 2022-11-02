import util
import json

BASE_COMMAND = "multimetric"

class MultiMetric:
    def __init__(self, files):
        self.targets = files
        command = util.build_command(BASE_COMMAND, *self.targets)
        multi_metric = util.execute_shell_command(command)
        self.multi_metric = util.string_to_json(multi_metric) #json

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
        diffculty_each = dict(zip(self.targets, difficulty))
        return diffculty_each
"""
def multimetric(*files):
    """
    return whole multimetric output
    ------------------------------------------------------
    input=
        files: files to check efficiency
    output=
        metric(json): json type metric
    """
    command = util.build_command(BASE_COMMAND, *files)
    multi_metric = util.execute_shell_command(command)
    multi_metric = json.loads(multi_metric)
    return multi_metric

def overall_metric(*files):
    """
    return summarized multimetric for all files
    ------------------------------------------------------
    output=
        metric(json): json type overall metric
    """
    multi_metric = multimetric(*files)
    overall_multi_metric = multi_metric['overall']
    
    return overall_multi_metric

def halstead_difficulty(*files):
    """
    return halstead difficulty for each file
    can calculate code efficiency through halstead difficulty
    ------------------------------------------------------
    output=
        difficulty(dict): difficulty for each file
    """
    multi_metric = multimetric(*files)
    
    eval_files = multi_metric['files'].keys()
    difficulty = [multi_metric['files'][eval_file]['halstead_difficulty'] for eval_file in eval_files]
    
    diffculty_each = dict(zip(files, difficulty))

    return diffculty_each
"""
if __name__ == "__main__":
    files = ['efficiency_test/free.py','efficiency_test/test_long.py']
    mm = MultiMetric(files)
    print(mm.multi_metric, type(mm.multi_metric))
    print("--------------------------------------------")
    print(mm.overall())
    print("--------------------------------------------")
    print(mm.halstead_difficulty())