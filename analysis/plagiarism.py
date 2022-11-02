import copydetect
from copydetect import CopyDetector
import os
import numpy as np

def compare_file(file1, file2, token_size, window_size=1):
    """
    compare two files by n-gram
    ----------------------------------------------------
    input=
        file1, file2: file name include path
        token_size: n in n-gram
    ----------------------------------------------------
    return=
        token_overlap: # of overlapping n-gram otkens
        similarity: # of tokens of file / token_overlap
        slices: tuple of two 2xN int arrays. Similar interval between two files
    """
    fp1 = copydetect.CodeFingerprint(file1, token_size, window_size)
    fp2 = copydetect.CodeFingerprint(file2, token_size, window_size)
    return copydetect.compare_files(fp1, fp2)

def similarity_check(tests, refers, threshold=0.5, extensions=['py']):
    """
    compare two files by n-gram
    both invalid tests and refers elements are dropped
    ----------------------------------------------------
    input=
        tests: list of directory or files including path 
               to check for plagiarism.
        refers: list of directory of filesincluding path
                to compare the test files to.
    ----------------------------------------------------
    return=
        test_files: list of files to test
        refer_files: list of files to compare
        detector: 
        similarity: (# of test files) X (# of refer files) shaped numpy matrix 
    """
    test_dirs = [candidate for candidate in tests if os.path.isdir(candidate)]
    test_files = [candidate for candidate in tests if os.path.isfile(candidate)]
    refer_dirs = [candidate for candidate in refers if os.path.isdir(candidate)]
    refer_files = [candidate for candidate in refers if os.path.isfile(candidate)]
    
    detector = CopyDetector(test_dirs=test_dirs,ref_dirs=refer_dirs,extensions=extensions, display_t=threshold)
    
    for test_file in test_files:
        detector.add_file(test_file,"test")
    for refer_file in refer_files:
        detector.add_file(refer_file,"ref")

    detector.run()

    similarity = detector.similarity_matrix[:,:,0]

    return detector.test_files, detector.ref_files, detector, similarity

def generate_html_report(detector):
    detector.generate_html_report()    