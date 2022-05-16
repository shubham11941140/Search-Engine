# Generate the links for the top 20 Wikipedia articles based on the search query

import csv
from googlesearch import search

def links_20(query):
    return [i for i in search(query, num = 20, stop = 20, pause = 2)]

def main():

    # Queries
    q1 = "domestic animals wikipedia"
    q2 = "wild animals wikipedia"
    q3 = "Marine animals wikipedia"

    # Generate the links for the top 20 Wikipedia articles based on the search query
    q1_links = links_20(q1)
    q2_links = links_20(q2)
    q3_links = links_20(q3)

    # Open a CSV file to write the results
    f = open('Description.csv', 'w')
    writer = csv.writer(f)
    writer.writerow(['Query', 'File Name', 'Doc ID', 'Link'])

    # Create a dictionary to store the inverted index
    # d = dict()

    # Build the inverted index for the first query

    # Traverse the links for the top 20 Wikipedia articles based on the search query
    for idx, link in enumerate(q1_links):

        # Create the file name
        f_name = "d" + str(idx + 1) + "_q1" + ".txt"

        # Get the first 3 paragraphs for the particular URL and store it onto a file
        #get_first_3(link, f_name)

        # Read the file contents and store the contents into the inverted index corresponding the docid
        #inv_index(d, f_name, idx + 1)

        writer.writerow([q1, f_name, idx + 1, link])

    # Build the inverted index for the second query

    # Traverse the links for the top 20 Wikipedia articles based on the search query
    for idx, link in enumerate(q2_links):

        # Create the file name
        f_name = "d" + str(idx + 1) + "_q2" + ".txt"

        # Get the first 3 paragraphs for the particular URL and store it onto a file
        #get_first_3(link, f_name)

        # Read the file contents and store the contents into the inverted index corresponding the docid
        # Since 20 documents are already stored, we need to start from 21
        #inv_index(d, f_name, 20 + idx + 1)

        writer.writerow([q2, f_name, 20 + idx + 1, link])

    # Build the inverted index for the third query

    for idx, link in enumerate(q3_links):

        # Create the file name
        f_name = "d" + str(idx + 1) + "_q3" + ".txt"

        # Get the first 3 paragraphs for the particular URL and store it onto a file
        # get_first_3(link, f_name)

        # Read the file contents and store the contents into the inverted index corresponding the docid
        # Since 40 documents are already stored, we need to start from 41
        # inv_index(d, f_name, 20 + 20 + idx + 1)

        writer.writerow([q3, f_name, 40 + idx + 1, link])

main()