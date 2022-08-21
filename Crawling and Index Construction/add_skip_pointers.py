# Complete the library import
from json import dump, load

from math import floor, sqrt

from merging import check_valid, restrictive_order, solver

from time import time

from nltk.tokenize import word_tokenize

from nltk.stem import PorterStemmer

from nltk.corpus import stopwords

# Obtain the inverted index from the json file
def build_index(path):

    # Open the json file
    with open(path) as json_file:

        # Load the json file into a dictionary
        return load(json_file)

# Add skip pointer list to the posting list
def add_skip_list(posting_list):

    # Create a new list
    post_list_with_skips = []

    # Count the number of skip pointers
    skip_count = floor(sqrt(len(posting_list)))

    # Even distancing between skip pointers
    skip_period = len(posting_list) // skip_count

    # -1 because of list indexing starts with 0
    skip_index = skip_period - 1

    # Traverse the list
    for pos_index in range(len(posting_list)):

        # If we can place a skip pointer, even spaced index is reached
        if pos_index == skip_index:

            # Add the skip pointer as a tuple to the corresponding docid
            post_list_with_skips.append([posting_list[pos_index], skip_index + skip_period])

            # Move the skip pointer index forward
            skip_index += skip_period

        else:

            # Add the docid to the list
            post_list_with_skips.append([posting_list[pos_index], 0])

    # Return the new list
    return post_list_with_skips

# Given the initial inverted index, add the skip pointers to the posting lists
def add_skip_pointers(inv_index):

    # Create a new index
    re_index = {}

    # Traverse the index
    for i in inv_index:

        # If the skip pointer is not 0, add the skip pointers to the posting list
        if i not in re_index:

            # Call the function to create the posting list with skip pointers
            re_index[i] = add_skip_list(inv_index[i])

    # Return the new index
    return re_index

def without_skip_pointers(queries, inv_index):

    # Time before the solver function is called
    start_time = time()

    # Take the average value over a 100 iterations to check the time of execution for the solver function
    for _ in range(100):

        # Iterate through each query
        for query in queries:

            # Call the solver function
            solver(query, inv_index)

    # Time after the solver function is called
    end_time = time()

    # Return the average time of execution
    return (end_time - start_time) / 100


def merge_with_skip_pointers(lis1, lis2):

    # Initialize the result list
    merged_list = []

    # Initialize the pointers
    i = 0
    j = 0

    n1 = len(lis1)
    n2 = len(lis2)

    # Iterate through the lists
    while i != n1 and j != n2:

        # Check if the elements in both the lists are equal
        if lis1[i][0] == lis2[j][0]:

            # Append the element to the result list
            merged_list.append(lis1[i][0])

            # Move the pointer forward
            i += 1
            j += 1

        # Check if the current element of the first list is less than the current element of the second list
        elif lis1[i][0] < lis2[j][0]:

            # Check for the skip pointer
            if lis1[i][1] != 0 and lis1[i][1] < n1 and lis1[lis1[i][1]][0] <= lis2[j][0]:

                # As long as we can find a skip pointer keep moving ahead
                while lis1[i][1] != 0 and lis1[i][1] < n1 and lis1[lis1[i][1]][0] <= lis2[j][0]:

                    # Move the pointer forward to the next skip pointer
                    i = lis1[i][1]

            # If there is no skip pointer, move the pointer forward
            else:
                i += 1

        # Case where the current element of the second list is less than the current element of the first list
        else:

            # Check for skip pointer
            if lis2[j][1] != 0 and lis2[j][1] < n2 and lis2[lis2[j][1]][0] <= lis1[i][0]:

                # As long as we can find a skip pointer keep moving ahead
                while lis2[j][1] != 0 and lis2[j][1] < n2 and lis2[lis2[j][1]][0] <= lis1[i][0]:

                    # Move the pointer forward to the next skip pointer
                    j = lis2[j][1]

            # If there is no skip pointer, move the pointer forward
            else:
                j += 1

    return merged_list

# Implement the function to process the order of the merging of query terms, takes query as input and dictionary
# Implement the coordinator function that returns the final answer

def solver_with_skip_pointers(q_keys, index):

    # Check the validity of the query terms
    val = check_valid(q_keys, index)

    # If the query is not valid, return an empty list
    if not val:
        return ["No results found"]

    # If we have only 1 query term, we can directly return the posting list
    if len(q_keys) == 1:
        return index[q_keys[0]]

    # If we have only 2 query terms, we can directly call the merge function
    if len(q_keys) == 2:
        return merge_with_skip_pointers(index[q_keys[0]], index[q_keys[1]])

    # Check we have more than 2 query terms
    assert len(q_keys) > 2

	# If we have more than 2 query terms, we need to merge the posting lists by the order of the smallest lists

	# new_order is the list of keys in the order that is the most optimal
    new_order = restrictive_order(q_keys, index)

    # Initialize the result list
    current_res = merge_with_skip_pointers(index[new_order[0]], index[new_order[1]])

    # Iterate through the remaining query terms and merge the posting lists
    for i in range(2, len(new_order)):
        current_res = merge_with_skip_pointers(current_res, index[new_order[i]])

    # Return the result
    return current_res


def with_skip_pointers(queries, inv_index):

    # Time before the solver function is called
    start_time = time()

    # Take the average value over a 100 iterations to check the time of execution for the solver function
    for _ in range(100):

        # Iterate through each query
        for query in queries:

            # Call the solver function
            solver_with_skip_pointers(query, inv_index)

    # Time after the solver function is called
    end_time = time()

    # Return the average time of execution
    return (end_time - start_time) / 100

# Extract the terms from the query
def extract_query(query):

    # Split the queries into query terms
    q_keys = query.split(" AND ")

    # Convert the query to lowercase
    low = [x.lower() for x in q_keys]

    # Get the tokens from the queries
    text_tokens = [word_tokenize(x) for x in low]

    # Initialize the stopwords and remove them
    tokens_without_sw = [x for x in text_tokens if not x in stopwords.words('english')]

    # Get the string from the list
    tokens_without_sw = [''.join(i) for i in tokens_without_sw]

    # Initialize the stemmer
    ps = PorterStemmer()

    # Stem all the words
    queries = [ps.stem(y) for y in tokens_without_sw]

    # As we have obtained the exact words, we can return the list
    return queries

# Main function
def main():

    # Obtain the inverted index from the file
    inv_index = build_index("inverted_index.json")

    # Add the skip pointers to the inverted index
    re_index = add_skip_pointers(inv_index)

    # The new inverted index is the updated inverted index is stored in the file
    print("Writing the inverted index with skip pointers to JSON file: inverted_index_with_skip_pointers.json")

    # Write the updated inverted index to the file
    with open("inverted_index_with_skip_pointers.json", "w") as f:
        dump(re_index, f)

    # The queries are stored in a list
    given_queries = ["predators AND ferocious", "fishes AND cats", "wild AND dogs"]

    # Extract the query terms
    queries = [extract_query(query) for query in given_queries]

    print("The Execution Time for the queries without the skip pointers when averaged to 100 iterations (in seconds) is:", without_skip_pointers(queries, inv_index))

    print("The Execution Time for the queries with the skip pointers when averaged to 100 iterations (in seconds) is:", with_skip_pointers(queries, re_index))

if __name__ == "__main__":
	main()

