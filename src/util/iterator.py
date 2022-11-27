def flatten_list(lst):
    flat_list = []
    for element in lst:
        flat_element = []
        if isinstance(element, list):
            flat_element = flatten_list(element)
            flat_list += flat_element
        else:
            flat_list.append(element)
    return flat_list