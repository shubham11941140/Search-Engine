# Search-Engine
Builds a complete Information Retrieval Engine from scratch

Contains 4 components:

1. Elastic Search
2. Inverted Index
3. Document Ranking
4. Classifier

## Elastic Search

1. Set up Elastic Search on GCP (Google Cloud Platform)
2. Netflix TV Shows Dataset is used - **https://www.kaggle.com/datasets/shivamb/netflix-shows**

3. Docs Preprocessing to Run Queries - **https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html**

#### Queries written to extract information the Elastic Search Index

#### Questions are mentioned in the folder ReadMe

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

## Document Ranking

Contrasted 3 models after generating tokens and creating inverted index

![image](https://user-images.githubusercontent.com/63910248/168475380-51375a5b-40a5-4ed6-89d4-f769aad685db.png)

1. **TF-IDF**

![image](https://user-images.githubusercontent.com/63910248/168475302-50aea55b-55d9-403d-9618-915a1ef1e398.png)

2. **Binary Independence Model (BIM)**

![image](https://user-images.githubusercontent.com/63910248/168475262-cf2886b7-5d5c-4b4a-b42c-77f4681ad41a.png)

3. **Language Model (Unigram)**

![image](https://user-images.githubusercontent.com/63910248/168475238-bc87adbb-6f19-40c7-83eb-e0196d16fd96.png)

#### Metrics Plotted ![image](https://user-images.githubusercontent.com/63910248/168475416-e1817a65-1fd0-40b0-aa9c-0906ff8add07.png)


#### Precision

![image](https://user-images.githubusercontent.com/63910248/168475143-2377c607-7e5b-42fc-b9a9-c368eeaee533.png)

#### Recall

![image](https://user-images.githubusercontent.com/63910248/168475173-a56866bc-2745-4b08-a81b-c64041cbe029.png)

#### Mean Average Precision

![image](https://user-images.githubusercontent.com/63910248/168475219-d90e0ee7-1e2c-4909-8196-e05ba741f24e.png)

## Classifier

Developed 3 classifiers to classify documents based on queries assigned.

### GROUND TRUTH Labels have been Pre-Assigned 

 1. **70 % Random shuffled selection for training and 30 % for testing**
 2. **Rocchio Classifier**
 3. **KNN Classifier (K = 1, 3 and 5)**
 4. **Precision, Recall, F1 Score Accuracy is reported**
 
 ### Rocchio Metrics

 ![image](https://user-images.githubusercontent.com/63910248/168483909-29d11ce3-0641-4d10-a818-03beff5d5d10.png)

 ### KNN Metrics (K = 1)
 
 ![image](https://user-images.githubusercontent.com/63910248/168483993-199f8b19-0ea6-4086-af2b-298bd2536b11.png)

 ### KNN Metrics (K = 3)
 
 ![image](https://user-images.githubusercontent.com/63910248/168484006-ea8dd036-49b0-4516-a530-a6b44a3a2e72.png)
 
  ### KNN Metrics (K = 5)
 
 ![image](https://user-images.githubusercontent.com/63910248/168484011-86b8bee5-2373-4b9f-b75b-0823e6ea4696.png)


