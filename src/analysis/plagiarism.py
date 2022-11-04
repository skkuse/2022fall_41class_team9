import copydetect
from copydetect import CopyDetector
import os
import numpy as np
from file import TestFileManager

class Detector(TestFileManager):
    #Similarity can test both files and (all files in) dirs
    def __init__(self, files):
        super().__init__(files)

    def similarity(self, refers, threshold=0.5, extensions=['py']):
        """
        get structure similarity of test files and refer files
        both invalid tests and refers elements are dropped
        ----------------------------------------------------
        input=
            refers: list of directory of files including path to compare the test files to.
        ----------------------------------------------------
        return=
            test_files(iterable): list of files to test
            refer_files(iterable): list of files to compare
            detector(detector) 
            similarity(numpy array): (# of test files) X (# of refer files) shaped numpy matrix 
        """
        refer_dirs = [candidate for candidate in refers if os.path.isdir(candidate)]
        refer_files = [candidate for candidate in refers if os.path.isfile(candidate)]
        detector = CopyDetector(test_dirs=self.test_dirs,
                                ref_dirs=refer_dirs,
                                extensions=extensions,
                                display_t=threshold)

        for test_file in self.test_files:
            detector.add_file(test_file,"test")
        for refer_file in refer_files:
            detector.add_file(refer_file,"ref")
        
        detector.run()

        similarity = detector.similarity_matrix[:,:,0]

        return detector.test_files, detector.ref_files, detector, similarity        

def compare_file(file1, file2, token_size, window_size=1):
    """
    compare two files by n-gram
    ----------------------------------------------------
    input=
        file1, file2: file name include path
        token_size: n in n-gram
    ----------------------------------------------------
    return=
        token_overlap(int): # of overlapping n-gram otkens
        similarity(tuple): # of tokens of file / token_overlap
        slices(tuple): tuple of two 2xN int arrays. Similar interval between two files
    """
    fp1 = copydetect.CodeFingerprint(file1, token_size, window_size)
    fp2 = copydetect.CodeFingerprint(file2, token_size, window_size)
    return copydetect.compare_files(fp1, fp2)

def generate_html_report(detector):
    detector.generate_html_report()

if __name__ == "__main__":
    sc = Detector(['tests'])
    print(sc.test_files)
    tf, rf, detector, similarity = sc.similarity(['refers'])

    print(tf)
    print(rf)
    print(similarity)
