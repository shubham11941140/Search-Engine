# Complete the library import
from json import load

from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize


# Obtain the inverted index from the json file
def build_index(path):

    # Open the json file
    with open(path) as json_file:

        # Load the json file into a dictionary
        return load(json_file)


# For restricting the order of the query terms
# We will merge the smallest lists first
def restrictive_order(q_keys, index):

    # Returns the dictionary in the order of the smallest lists
    return sorted(q_keys, key=len(index[key]))


# Implement the merge algorithm to merge two posting list
def merge_ps(lis_1, lis_2):

    # Initialize the result list
    merged_lis = []

    # Initialize the pointers

    i = 0
    j = 0

    n1 = len(lis_1)
    n2 = len(lis_2)

    # Iterate through the lists
    while i != n1 and j != n2:

        # Check if the elements in both the lists are equal
        if lis_1[i] == lis_2[j]:

            # Append the element to the result list
            merged_lis.append(lis_1[i])

            # Move both the pointers
            i += 1
            j += 1

        # Check if the current element of the first list is less than the current element of the second list
        elif lis_1[i] < lis_2[j]:
            i += 1
            # Case where the current element of the second list is less than the current element of the first list
        else:
            j += 1

    # Return the result
    return merged_lis


# Check if the key exists in the inverted index
def check_valid(q_keys, index):

    # Iterate through the keys
    return all(not key not in index for key in q_keys)


# Implement the function to process the order of the merging of query terms, takes query as input and dictionary
# Implement the coordinator function that returns the final answer


def solver(q_keys, index):

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
        return merge_ps(index[q_keys[0]], index[q_keys[1]])

    # Check we have more than 2 query terms
    assert len(q_keys) > 2

    # If we have more than 2 query terms, we need to merge the posting lists by the order of the smallest lists

    # new_order is the list of keys in the order that is the most optimal
    new_order = restrictive_order(q_keys, index)

    # Initialize the result list
    current_res = merge_ps(index[new_order[0]], index[new_order[1]])

    # Iterate through the remaining query terms and merge the posting lists
    for i in range(2, len(new_order)):
        current_res = merge_ps(current_res, index[new_order[i]])

    # Return the result
    return current_res


# Main function
def main():

    # Obtain the inverted index from the json file
    path = "inverted_index.json"
    inv_index = build_index(path)

    # We can run infinite queries
    while True:

        # Obtain the query from the use
        query = input("Enter query or write exit to quit: ")

        # Check if the user wants to quit
        if query == "exit":
            break

        # Split the query into words
        q_keys = query.split(" AND ")

        # Convert the query into lower case
        low = [i.lower() for i in q_keys]

        # Get the tokens from the query
        text_tokens = [word_tokenize(i) for i in low]

        # Initialize the stop words	and remove them
        tokens_without_sw = [
            word for word in text_tokens
            if not word in stopwords.words("english")
        ]

        # Get the strings from the tokens
        tokens_without_sw = ["".join(i) for i in tokens_without_sw]

        # Initialize the stemmer
        ps = PorterStemmer()

        # Stem all the words
        tokens_without_sw_stem = [ps.stem(word) for word in tokens_without_sw]

        # Call the solver function
        q_result = solver(tokens_without_sw_stem, inv_index)

        # Print the result
        print(f"The documents satisfying the query are: \n {q_result} \n")


if __name__ == "__main__":
    main()
