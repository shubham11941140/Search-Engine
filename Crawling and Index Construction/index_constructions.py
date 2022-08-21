# Complete all the necessary imports

from bs4 import BeautifulSoup
from googlesearch import search
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from json import dump
from requests import get

import nltk

# Download the stopwords to be checked before creating the posting list
nltk.download('stopwords')

# Generate the links for the top 20 Wikipedia articles based on the search query
def links_20(query):
    return [i for i in search(query, num = 20, stop = 20, pause = 2)]

# function to extract html document from given url
def getHTMLdocument(url):

    # create a request object
    # request for HTML document of given url
    # response will be provided in JSON format
    return get(url).text

# Get the first 3 paragraphs for the particular URL and store it onto a file
def get_first_3(url_to_scrape, file_name):

    # create document
    html_document = getHTMLdocument(url_to_scrape)

    # create soap object
    soup = BeautifulSoup(html_document, 'html.parser')

    # Open the file to write the result onto
    f = open(file_name, "w")

    # As we need only 3 paragraphs, we will extract only 3 paragraphs
    para_count = 1

    # traverse paragraphs from soup
    for data in soup.find_all("p"):

        # Get the result of the paragraph
        para_result = data.get_text()

        # Write the lines onto the file
        f.writelines(para_result)

        # If the paragraph count is 3, break
        if para_count == 3:
            break

        # Increment the paragraph count
        para_count += 1

    # Writing is done, close the file
    f.close()

# Check if a string is a number
def is_number(s):
    return s.isnumeric()

# Add the particular docid
def inv_index(d, file_name, docid):

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

    # Create a dictionary to store the tokens and their frequency
    for i in range(line):
        check = array[i].lower()

        # If it is a proper word, then add it to the dictionary
        for item in tokens_without_sw_stem:

            # We need to ignore all the numbers while creating the dictionary
            if not is_number(item):

                # As the docid needs to be added only once, we will check if the docid is already present
                if item in check:
                    if item not in d:

                        # Store the docid
                        d[item] = [docid]

                    if item in d:

                        # As the docid needs to be added only once, we will check if the docid is already present
                        if docid not in d[item]:

                            # Add the docid to the current posting list
                            d[item].append(docid)

def least_used_terms(d):

    # Sort by length of the posting list
    sd = dict(sorted(d.items(), key=lambda item: len(item[1])))

    # Return the top 3 results that come in the dictionary
    c = 0
    for i in sd:

        # Increment the counter
        c += 1

        # Print the term and posting list
        print(i, "->", d[i])

        # If the counter is 3, break
        if c == 3:
            return

def most_used_terms(d):

    # Sort by length of the posting list in reverse order of the length
    sd = dict(sorted(d.items(), reverse = True, key=lambda item: len(item[1])))

    # Return the top 3 results that come in the dictionary
    c = 0
    for i in sd:

        # Increment the counter
        c += 1

        # Print the term and posting list
        print(i, "->", d[i])

        # If the counter is 3, break
        if c == 3:
            return

def main():

    # Queries
    q1 = "domestic animals wikipedia"
    q2 = "wild animals wikipedia"
    q3 = "Marine animals wikipedia"

    # Generate the links for the top 20 Wikipedia articles based on the search query
    q1_links = links_20(q1)
    q2_links = links_20(q2)
    q3_links = links_20(q3)

    # Create a dictionary to store the inverted index
    d = {}

    # Build the inverted index for the first query

    # Traverse the links for the top 20 Wikipedia articles based on the search query
    for idx, link in enumerate(q1_links):

        # Create the file name
        f_name = "d" + str(idx + 1) + "_q1" + ".txt"

        # Get the first 3 paragraphs for the particular URL and store it onto a file
        get_first_3(link, f_name)

        # Read the file contents and store the contents into the inverted index corresponding the docid
        inv_index(d, f_name, idx + 1)

    # Build the inverted index for the second query

    # Traverse the links for the top 20 Wikipedia articles based on the search query
    for idx, link in enumerate(q2_links):

        # Create the file name
        f_name = "d" + str(idx + 1) + "_q2" + ".txt"

        # Get the first 3 paragraphs for the particular URL and store it onto a file
        get_first_3(link, f_name)

        # Read the file contents and store the contents into the inverted index corresponding the docid
        # Since 20 documents are already stored, we need to start from 21
        inv_index(d, f_name, 20 + idx + 1)

    # Build the inverted index for the third query

    for idx, link in enumerate(q3_links):

        # Create the file name
        f_name = "d" + str(idx + 1) + "_q3" + ".txt"

        # Get the first 3 paragraphs for the particular URL and store it onto a file
        get_first_3(link, f_name)

        # Read the file contents and store the contents into the inverted index corresponding the docid
        # Since 40 documents are already stored, we need to start from 41
        inv_index(d, f_name, 20 + 20 + idx + 1)

    # The inverted index is stored in a dictionary
    print("Writing the inverted index to JSON file: inverted_index.json")

    # This inverted dictionary is stored in a json file
    with open("inverted_index.json", "w") as outfile:
        dump(d, outfile)

    # Printing the posting list of the 3 most commonly used terms in the inverted index
    print("The Posting list of the 3 most commonly used terms in the inverted index")
    most_used_terms(d)

    # Printing the posting list of the 3 least commonly used terms in the inverted index
    print("The Posting list of the 3 least commonly used terms in the inverted index")
    least_used_terms(d)

if __name__ == "__main__":
	main()
