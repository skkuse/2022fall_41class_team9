from memory_profiler import memory_usage

def get_memory_profile(string_solution,input_case):
    if not hasattr(input_case, "__iter__"):
        input_case = tuple([input_case])
    # exec string solution re-defines solution variable
    print("========================================")
    print(input_case)
    print("========================================")
    exec(string_solution,globals())
    result = memory_usage((solution,input_case,{}))
    return result