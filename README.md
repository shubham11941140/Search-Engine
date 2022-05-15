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

![tf-idf](https://user-images.githubusercontent.com/63910248/168473932-5e99dbd2-1c6b-41ce-83ab-2e458f41f2d0.PNG)

![similarity](https://user-images.githubusercontent.com/63910248/168473999-654a9432-3efd-4a7a-bf70-eca866fb9e30.PNG)

#### 5. Precision, Recall, Mean Average Precision (MAP) - All queries for 10 results

![ranking](https://user-images.githubusercontent.com/63910248/168473975-52284076-bc4a-4177-99dc-33bdd14057b6.PNG)

![queries](https://user-images.githubusercontent.com/63910248/168473979-4fc9e03f-cddf-42ab-a460-be2c7e02d783.PNG)

#### 6. Pseudo-Relevance Feedback applied for top 5 documents based on query (Beta = 1 - Alpha) (Alpha varied from [0, 1])

![Pseudo Relevance feedback](https://user-images.githubusercontent.com/63910248/168473941-3db7316c-3ccb-4223-995b-a1439c35e6ab.PNG)

#### 7. Alpha scores obtained to obtain maximum Average Precsion weighted across the queries

![alpha](https://user-images.githubusercontent.com/63910248/168473945-a7eb2312-f644-457a-81ef-cee7d9b29a8a.PNG)

## Contrasted between both the constructed inverted indexes in terms of speed and plotted metrics considered

![time taken](https://user-images.githubusercontent.com/63910248/168473959-f047fd08-0e9d-41fa-af30-cdb75ef6268a.PNG)

![MAP](https://user-images.githubusercontent.com/63910248/168473961-9d567955-f9db-4f8d-b211-da34404b54cb.PNG)
