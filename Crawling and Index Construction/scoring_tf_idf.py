# Complete all the necessary imports

from math import log

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

from merging import build_index, solver
from add_skip_pointers import extract_query

from time import time

import nltk

# Download the stopwords to be checked before creating the posting list
nltk.download('stopwords')

# Check if a string is a number
def is_number(s):
    return s.isnumeric()

# Make a list of the document
def preprocess_document(alldocs, file_name, docid):

    # Open the file
    file = open(file_name, encoding='utf8')

    # Read the file
    read = file.read()

    # Take the cursor to the beginning of the file
    file.seek(0)

    # Count the number of lines in the file
    line = len([1 for word in read if word == '\n'])

    # Create a list to store each line as an element of list
    array = [file.readline() for _ in range(line)]

    # Define the punctuations
    punc = '''!()-[]{};:'"\, <>./?@#$%^&*_~'''

    # Remove all the punctuations from the file
    for ele in read:
        if ele in punc:
            read = read.replace(ele, " ")

    # Convert the entire file into lowercase
    read = read.lower()

    # This will convert the word into tokens
    text_tokens = word_tokenize(read)

    # Remove all the stopwords from the tokens
    tokens_without_sw = [word for word in text_tokens if not word in stopwords.words('english')]

    # Initialize the stemmer
    ps = PorterStemmer()

    # Stem all the words
    tokens_without_sw_stem = [ps.stem(word) for word in tokens_without_sw]

    # Create a array to store the tokens and their frequency
    for i in range(line):
        check = array[i].lower()

        # If it is a proper word, then add it to the array
        for item in tokens_without_sw_stem:

            # We need to ignore all the numbers while creating the array
            if not is_number(item):

                # If the term is present in the current line
                if item in check:

                    # Add the term to the list
                    alldocs[docid].append(item)

# To generate a list of all the documents
def all_docs():

    # Generate a list of all the documents
    alldocs = [[] for _ in range(100)]

    # First set of 20 documents
    for idx in range(20):

        # Get the file name
        f_name = "d" + str(idx + 1) + "_q1" + ".txt"

        # Read the file contents and store the contents into the alldocs corresponding to the docid
        preprocess_document(alldocs, f_name, idx + 1)

    # Second set of 20 documents
    for idx in range(20):

        # Get the file name
        f_name = "d" + str(idx + 1) + "_q2" + ".txt"

        # Read the file contents and store the contents into the alldocs corresponding to the docid
        preprocess_document(alldocs, f_name, 20 + idx + 1)

    # Third set of 20 documents
    for idx in range(20):

        # Get the file name
        f_name = "d" + str(idx + 1) + "_q3" + ".txt"

        # Read the file contents and store the contents into the alldocs corresponding to the docid
        preprocess_document(alldocs, f_name, 20 + 20 + idx + 1)

    return alldocs

# This function will return the term frequency of a term in a document
def termFrequency(term, doc):

	"""
	Input: term: Term in the Document, doc: Document
	Return: Normalized tf: Number of times term occurs
	in document/Total number of terms in the document
	"""

	# Number of times the term occurs in the document
	term_in_document = doc.count(term)

	# Total number of terms in the document
	len_of_document = float(len(doc))

	# Normalized Term Frequency
	normalized_tf = term_in_document / len_of_document

	return normalized_tf

# Calculate the inverse document frequency of a term
def inverseDocumentFrequency(term, allDocs, total_docs = 60):

	num_docs_with_given_term = 0

	"""
	Input: term: Term in the Document,
		allDocs: List of all documents
	Return: Inverse Document Frequency (idf) for term
			= Logarithm ((Total Number of Documents) /
			(Number of documents containing the term))
	"""
	# Iterate through all the documents
	for doc in allDocs:

		"""
		Putting a check if a term appears in a document.
		If term is present in the document, then
		increment "num_docs_with_given_term" variable
		"""

		if term in doc:
			num_docs_with_given_term += 1

	if num_docs_with_given_term:

		# Calculating the IDF and returning it
		idf_val = log(float(total_docs) / num_docs_with_given_term)
		return idf_val

	else:
		return 0

# Calculate the tf-idf score of a term in a document
def tf_idf_score(query, result, alldocs):

    # Iterate through all the query terms
    for term in query:

        # Calculate the idf value of the term
        idf = inverseDocumentFrequency(term, alldocs)

        # If the idf value is 0, then the term is not present in the document, so we can ignore it
        if not idf or result[0] == "No results found":
            continue

        # If the term is present in the document
        for doc in result:

            # Calculate the tf value of the term
            tf = termFrequency(term, alldocs[doc])

            # Calculate the tf-idf value of the term
            tf_idf = tf * idf

# Run each query for a 100 times and take the average
def execute_100(query, result, alldocs):

    # Time before the solver function is called
    start_time = time()

    # Take the average value over a 100 iterations to check the time of execution for the solver function
    for _ in range(100):

        # Call the solver function
        tf_idf_score(query, result, alldocs)

    # Time after the solver function is called
    end_time = time()

    # Return the average time of execution
    return (end_time - start_time) / 100

# Main function
def main():

    # Get the list of all the documents
    alldocs = all_docs()

    # The queries are stored in a list
    given_queries = ["predators AND ferocious", "fishes AND cats", "wild AND dogs"]

    # Extract the query terms
    queries = [extract_query(query) for query in given_queries]

    # Obtain the inverted index from the file
    inv_index = build_index("inverted_index.json")

    # The TF-IDF Scheme used is as follows:
    print("The TF-IDF scheme used is the Vector Space Model (VSM)")
    print("The TF is calculated as: TF = (Number of times term occurs in document) / (Total number of terms in document)")
    print("The IDF is calculated as: IDF = Logarithm ((Total Number of Documents) / (Number of documents containing the term))")

    # Iterate through all the queries
    for query in queries:

        # Get the docid of the query terms by the inverted index
        result = solver(query, inv_index)

        # If the query is not found, then print "No results found"
        # Else, print the docid of the query terms
        print("The results for query:", query, "are docids (sorted):", sorted(result))

        # Print the average time of execution for the solver function
        print("The Execution time for query:", query, "by computing the TF-IDF score when averaged to 100 iterations (in seconds) is:", execute_100(query, result, alldocs))

if __name__ == "__main__":
    main()



