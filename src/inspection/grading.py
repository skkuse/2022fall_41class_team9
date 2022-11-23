import os
import util
import unittest
import json
from wrapper import temp_py_handler, timeout
from execution import Runner

LOCAL_TIMEOUT = 10

class AnswerTestCase(unittest.TestCase):
    file = None
    input = None #list format
    output = None
    answer = None
    runner = Runner(code=None, encoding=None)

    @timeout(LOCAL_TIMEOUT)
    def test_compare(self):
        if self.file is not None:
            self.output = self.runner.run_existing_soln(self.file, *self.input)
            self.output = str(self.output)
        self.assertEqual(self.answer, self.output)

class Tester:
    def __init__(self, code, inputs, answers):
        self.code = code
        
        self.inputs = inputs
        self.answers = answers
        self.outputs = []
        self.test_results = []
        self.reports = []
        
        self.suite = unittest.TestSuite()
        self.suite.addTest(AnswerTestCase("test_compare"))
        self.runner = unittest.TextTestRunner()

    def set_test_env(self, file, input, answer):
        AnswerTestCase.file = file
        AnswerTestCase.input = input
        AnswerTestCase.answer = answer

    @temp_py_handler(file="tester_temp.py")
    def run(self, **kwargs):
        assert len(self.inputs) == len(self.answers)
        
        fd = kwargs['fd']
        file = kwargs['file']
        fd.write(self.code)
        os.fsync(fd)
        fd.flush()

        for input, answer in zip(self.inputs, self.answers):
            self.set_test_env(file, input, answer)
            result = self.runner(self.suite)
            output = AnswerTestCase.output

            self.test_results.append(result)
            self.outputs.append(output)

        return self.report()

    def report(self):
        #"P":pass, "E":error, "F":fail
        #아직 output format 안 정했습니다.
        #(is_correct, input, output, answer)
        report = {}
        for idx, (input, output, answer, result) in enumerate(zip(self.inputs, self.outputs, self.answers, self.test_results)):
            sub_report = {}
            flag = "P"
            if not result.errors:
                output = result.errors[0]
                flag = "E"
            if not result.failures:
                flag = "F"
            
            sub_report["input"] = input
            sub_report["output"] = output
            sub_report["answer"] = answer
            sub_report["flag"] = flag

            report[f"case_{idx}"] = sub_report

        return report
        
if __name__ == "__main__":
    inputs = [(3,4), (4,5), (5,6)]
    answers = [11,10,35]
    tester = Tester("", inputs, answers, AnswerTestCase)
    tester.run()