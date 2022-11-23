import os
import util
import unittest
import json
from wrapper import temp_py_handler, timeout
from execution import Runner

LOCAL_TIMEOUT = 10

class AnswerTestCase(unittest.TestCase):
    output = None
    answer = None

    @timeout(LOCAL_TIMEOUT)
    def test_compare(self):
        self.output = str(self.output)
        self.assertEqual(self.answer, self.output)

class Tester:
    def __init__(self, code, inputs, answers, encoding="utf-8"):
        self.code = code
        
        self.inputs = inputs
        self.answers = answers
        self.outputs = []
        self.test_results = []

        self.executer = Runner(code=code, encoding=encoding)

    def set_test_env(self, output, answer):
        AnswerTestCase.output = output
        AnswerTestCase.answer = answer

    def run(self, **kwargs):
        assert len(self.inputs) == len(self.answers)
        
        for input, answer in zip(self.inputs, self.answers):
            output = self.executer.run_soln(*input)

            suite = unittest.TestSuite()
            suite.addTest(AnswerTestCase("test_compare"))
            runner = unittest.TextTestRunner()

            self.set_test_env(output, answer)
            result = runner.run(suite)

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
            
            if not util.is_empty(result.errors):
                output = result.errors[0]
                flag = "E"
            if not util.is_empty(result.failures):
                if "Error" in str(output):
                    flag = "E"
                else:
                    flag = "F"

            sub_report["input"] = input
            sub_report["output"] = output
            sub_report["answer"] = answer
            sub_report["flag"] = flag

            report[f"case_{idx+1}"] = sub_report

        return report
         
if __name__ == "__main__":
    fd = open("code/code_error.py", "r")
    code = fd.read()
    fd.close()

    inputs = [(1,2),(3,4),(5,6), ("err", "or")]
    answers = ["3","5","11", "error"]
    print("----------------------------start-----------------------------")
    tester = Tester(code, inputs, answers)
    report = tester.run()
    print(report)