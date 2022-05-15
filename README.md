# Search-Engine
Builds a complete Information Retrieval Engine from scratch

## Inverted Index

Dataset is given

1. query.txt contains total 82 queries, which has 2 columns query id and query.
2. alldocs.rar contains documents file named with doc id. Each document has set of sentences.
3. output.txt contains top 50 relevant documents (doc id) for each query.

#### 1. Built an inverted index- dictionary and postings list using standard data structures in Python (Dictionary, Json Formats, List…).

![tokens](https://user-images.githubusercontent.com/63910248/168473897-f0a6f24a-edd9-4e29-9c55-d5a1ee98a4e3.PNG)



#### 2. ELasticSearch inverted index construction - https://pypi.python.org/pypi/elasticsearch
#### 3. NLTK Libraries used for Tokenization/Stemming/Lemmatization - http://www.nltk.org/install.html (Book used: http://www.nltk.org/book)
#### 4. TF-IDF Scoring performed
#### 5. Precision, Recall, Mean Average Precision (MAP) - All queries for 10 results
#### 6. Pseudo-Relevance Feedback applied for top 5 documents based on query (Beta = 1 - Alpha) (Alpha varied from [0, 1])
#### 7. Alpha scores obtained to obtain maximum Average Precsion weighted across the queries
## Contrasted between both the constructed inverted indexes in terms of speed and plotted metrics considered
