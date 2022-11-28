import os
import unittest
import json
from .utils.wrapper import timeout
from .execution import Runner

LOCAL_TIMEOUT = 10

class AnswerTestCase(unittest.TestCase):
    output = None
    answer = None

    @timeout(LOCAL_TIMEOUT)
    def test_compare(self):
        self.output = self.output
        self.assertEqual(self.answer, self.output)

class Tester:
    def __init__(self, code, inputs, answers, is_open, start_test_id, encoding="utf-8"):
        self.code = code
        
        self.inputs = inputs
        self.answers = answers
        self.is_open = is_open
        self.start_test_id = start_test_id
        self.outputs = []
        self.test_results = []

        self.executer = Runner(code=code, encoding=encoding)

    def set_test_env(self, output, answer):
        AnswerTestCase.output = output
        AnswerTestCase.answer = answer

    def run(self, **kwargs):
        assert len(self.inputs) == len(self.answers)
        
        for input, answer in zip(self.inputs, self.answers):
            if not hasattr(input, "__iter__"):
                input = [input]
            print(input, answer)
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
        report = []
        for idx, (input, output, answer, result) in enumerate(zip(self.inputs, self.outputs, self.answers, self.test_results), self.start_test_id):
            sub_report = {}
            flag = "pass"
            
            if len(result.errors) > 0:
                output = result.errors[0]
                flag = "fail"
            elif len(result.failures) > 0:
                flag = "fail"

            sub_report['id'] = idx
            sub_report["input"] = input
            sub_report["output"] = output
            sub_report["answer"] = answer
            sub_report["status"] = flag
            sub_report['is_open'] = self.is_open

            report.append(sub_report)

        return report