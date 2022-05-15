# Which year has maximum no. of movies released means which year has occured in maximum number of documents as a released_year
# Below query returns the top 3 years in which highest number of movies were released

# Result: In 2018 and 2017, 767 Movies were released

# Note: We have given value of type field as "Movie" as there are also TV Shows that can be released in the same year, but we only need count of the Movies.

# QUERY:
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": { "term": { "type": "Movie" } },
   "aggs": {
      "frequent_tags": {
         "terms": {"field": "release_year", "size": 3}
      }
   }
}

# OUTPUT:
{
  "aggregations" : {
    "frequent_tags" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 3937,
      "buckets" : [
        {
          "key" : 2018,
          "doc_count" : 767
        },
        {
          "key" : 2017,
          "doc_count" : 766
        },
        {
          "key" : 2016,
          "doc_count" : 658
        }
      ]
    }
  }
}


# In the last 5 years, which month had the highest number of movie releases on average?

# Ans: July has the highest number of movie releases in last 5 years.

# QUERY:
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "bool": {
      "must": [
        {"term": { "type": "Movie"}},
        {"range": { "release_year": { "gte": 2017, "lte": 2021}}}
      ]
    }
  },
   "aggs": {
      "frequent_tags": {
         "terms": {"field": "month_added", "size": 3}
      }
   }
}

OUTPUT:
{
  "aggregations" : {
    "frequent_tags" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 2139,
      "buckets" : [
        {
          "key" : "July",
          "doc_count" : 275
        },
        {
          "key" : "June",
          "doc_count" : 274
        },
        {
          "key" : "April",
          "doc_count" : 272
        }
      ]
    }
  }
}

# What is the average duration of a movie on Netflix?
# Ans: 99.57 min is the average duration of a movie on Netflix

# QUERY:
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": { "term": { "type": "Movie" } },
  "aggs": {
    "avg_duration": {
      "avg": {
        "field": "duration_movies"
      }
    }
  }
}

# OUTPUT:
{
  "aggregations" : {
    "avg_duration" : {
      "value" : 99.57718668407311
    }
  }
}


# What is the average movie duration in the USA as compared to India?
# Ans: In USA avg_duration is: 90.62 min and In India it is 126.92

# QUERY (For India):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "bool": {
      "must": [
        {"match": {"country": "India"}},
        {"match": {"type": "Movie"}}
      ]
    }
  },
  "aggs": {
    "avg_duration": {
      "avg": {
        "field": "duration_movies"
      }
    }
  }
}

# OUTPUT:
{
  "aggregations" : {
    "avg_duration" : {
      "value" : 126.92273236282195
    }
  }
}

# QUERY (For USA):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "bool": {
      "must": [
        {"match": {"country": "UnitedStates"}},
        {"match": {"type": "Movie"}}
      ]
    }
  },
  "aggs": {
    "avg_duration": {
      "avg": {
        "field": "duration_movies"
      }
    }
  }
}

# OUTPUT:
{
  "aggregations" : {
    "avg_duration" : {
      "value" : 90.62968369829683
    }
  }
}

# Find the top 5 countries with the most content.
# Ans: USA, India, UK, Japan, South Korea

# QUERY:
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "bool": {
      "must_not":{"match": {"country": "NULL"}}
    }
  },
  "aggs": {
    "top_countries": {
      "terms": {
        "field": "country",
        "size": 5
      }
    }
  }
}

# OUTPUT:
{
  "aggregations" : {
    "top_countries" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 3322,
      "buckets" : [
        {
          "key" : "UnitedStates",
          "doc_count" : 2809
        },
        {
          "key" : "India",
          "doc_count" : 972
        },
        {
          "key" : "UnitedKingdom",
          "doc_count" : 418
        },
        {
          "key" : "Japan",
          "doc_count" : 244
        },
        {
          "key" : "SouthKorea",
          "doc_count" : 199
        }
      ]
    }
  }
}

# What are the top 5 categories for each of them?

# QUERY (For USA):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "match": {
      "country": "UnitedStates"
    }
  },
  "aggs": {
    "top_categories": {
      "terms": {
        "field": "listed_in",
        "size": 5
      }
    }
  }
}

# OUTPUT:
{
  "aggregations" : {
    "top_categories" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 2089,
      "buckets" : [
        {
          "key" : "Documentaries",
          "doc_count" : 249
        },
        {
          "key" : "Stand-UpComedy",
          "doc_count" : 209
        },
        {
          "key" : "Children&FamilyMovies,Comedies",
          "doc_count" : 90
        },
        {
          "key" : "Dramas",
          "doc_count" : 88
        },
        {
          "key" : "Comedies",
          "doc_count" : 84
        }
      ]
    }
  }
}

# QUERY (For India):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "match": {
      "country": "India"
    }
  },
  "aggs": {
    "top_categories": {
      "terms": {
        "field": "listed_in",
        "size": 5
      }
    }
  }
}

# OUTPUT:
{
  "aggregations" : {
    "top_categories" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 510,
      "buckets" : [
        {
          "key" : "Comedies,Dramas,InternationalMovies",
          "doc_count" : 120
        },
        {
          "key" : "Dramas,InternationalMovies",
          "doc_count" : 118
        },
        {
          "key" : "Dramas,IndependentMovies,InternationalMovies",
          "doc_count" : 108
        },
        {
          "key" : "Dramas,InternationalMovies,RomanticMovies",
          "doc_count" : 62
        },
        {
          "key" : "Action&Adventure,Dramas,InternationalMovies",
          "doc_count" : 54
        }
      ]
    }
  }
}

# QUERY (For UK):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "match": {
      "country": "UnitedKingdom"
    }
  },
  "aggs": {
    "top_categories": {
      "terms": {
        "field": "listed_in",
        "size": 5
      }
    }
  }
}

OUTPUT:
{
  "aggregations" : {
    "top_categories" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 292,
      "buckets" : [
        {
          "key" : "Documentaries",
          "doc_count" : 40
        },
        {
          "key" : "BritishTVShows,Docuseries,InternationalTVShows",
          "doc_count" : 27
        },
        {
          "key" : "BritishTVShows,InternationalTVShows,RealityTV",
          "doc_count" : 23
        },
        {
          "key" : "Documentaries,InternationalMovies",
          "doc_count" : 18
        },
        {
          "key" : "Stand-UpComedy",
          "doc_count" : 18
        }
      ]
    }
  }
}

# QUERY (For Japan):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "match": {
      "country": "Japan"
    }
  },
  "aggs": {
    "top_categories": {
      "terms": {
        "field": "listed_in",
        "size": 5
      }
    }
  }
}

OUTPUT:
{
  "aggregations" : {
    "top_categories" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 109,
      "buckets" : [
        {
          "key" : "AnimeSeries,InternationalTVShows",
          "doc_count" : 75
        },
        {
          "key" : "Action&Adventure,AnimeFeatures,InternationalMovies",
          "doc_count" : 32
        },
        {
          "key" : "AnimeSeries,Kids'TV",
          "doc_count" : 12
        },
        {
          "key" : "AnimeSeries,CrimeTVShows,InternationalTVShows",
          "doc_count" : 8
        },
        {
          "key" : "AnimeSeries,InternationalTVShows,TeenTVShows",
          "doc_count" : 8
        }
      ]
    }
  }
}

# QUERY (For South Korea):
GET /netflix_index/_search?size=0&filter_path=aggregations
{
  "query": {
    "match": {
      "country": "SouthKorea"
    }
  },
  "aggs": {
    "top_categories": {
      "terms": {
        "field": "listed_in",
        "size": 5
      }
    }
  }
}

OUTPUT:
{
  "aggregations" : {
    "top_categories" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 81,
      "buckets" : [
        {
          "key" : "InternationalTVShows,KoreanTVShows,RomanticTVShows",
          "doc_count" : 63
        },
        {
          "key" : "CrimeTVShows,InternationalTVShows,KoreanTVShows",
          "doc_count" : 20
        },
        {
          "key" : "InternationalTVShows,KoreanTVShows,TVDramas",
          "doc_count" : 18
        },
        {
          "key" : "Kids'TV,KoreanTVShows",
          "doc_count" : 9
        },
        {
          "key" : "InternationalTVShows,KoreanTVShows,TVComedies",
          "doc_count" : 8
        }
      ]
    }
  }
}


# Find all the movies that can be categorized as “romantic” and “comedy”

# QUERY:
GET /netflix_index/_search
{
  "query": {
    "bool": {
      "must": [
        {"wildcard": {"listed_in": "*RomanticMovies*"}},
        {"wildcard": {"listed_in": "*Comedies*"}}
      ]
    }
  }
}

# OUTPUT:
{
  "took" : 7,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 277,
      "relation" : "eq"
    },
    "max_score" : 2.0,
    "hits" : [
      {
        "_index" : "netflix_index",
        "_id" : "8mN9kn8BrsJefGjvOVzU",
        "_score" : 2.0,
        "_source" : {
          "country" : "India",
          "duration_movies" : 166,
          "show_id" : "s25",
          "director" : "S. Shankar",
          "release_year" : 1998,
          "rating" : "TV-14",
          "description" : "When the father of the man she loves insists that his twin sons marry twin sisters, a woman creates an alter ego that might be a bit too convincing.",
          "type" : "Movie",
          "title" : "Jeans",
          "duration_tv" : "166",
          "listed_in" : "Comedies,InternationalMovies,RomanticMovies",
          "cast" : "Prashanth, Aishwarya Rai Bachchan, Sri Lakshmi, Nassar",
          "date_added" : "2021-09-21 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-21T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "S2N9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "NULL",
          "duration_movies" : 110,
          "show_id" : "s114",
          "director" : "Stephen Herek",
          "release_year" : 2021,
          "rating" : "TV-PG",
          "description" : "Cassie lives to party... until she dies in a freak accident. Now this social butterfly needs to right her wrongs on Earth if she wants to earn her wings.",
          "type" : "Movie",
          "title" : "Afterlife of the Party",
          "duration_tv" : "110",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Victoria Justice, Midori Francis, Robyn Scott, Adam Garcia, Timothy Renouf, Gloria Garcia, Myfanwy Waring, Spencer Sutherland",
          "date_added" : "2021-09-02 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-02T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "dmN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 105,
          "show_id" : "s157",
          "director" : "Gary Winick",
          "release_year" : 2010,
          "rating" : "PG",
          "description" : "By responding to a letter addressed to Shakespeare's tragic heroine Juliet Capulet, an American woman in Verona, Italy, is led in search of romance.",
          "type" : "Movie",
          "title" : "Letters to Juliet",
          "duration_tv" : "105",
          "listed_in" : "Comedies,Dramas,RomanticMovies",
          "cast" : "Amanda Seyfried, Christopher Egan, Gael García Bernal, Vanessa Redgrave, Franco Nero, Luisa Ranieri, Marina Massironi, Milena Vukotic, Marcia DeBonis, Luisa De Santis, Lidia Biondi, Giordano Formenti, Chris Egan",
          "date_added" : "2021-09-01 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "eGN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 101,
          "show_id" : "s159",
          "director" : "Troy Byer",
          "release_year" : 2003,
          "rating" : "PG-13",
          "description" : "A nerdy teen tries to make himself cool by association when he convinces a popular cheerleader to pose as his girlfriend.",
          "type" : "Movie",
          "title" : "Love Don't Cost a Thing",
          "duration_tv" : "101",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Nick Cannon, Christina Milian, Kenan Thompson, Kal Penn, Steve Harvey, Al Thompson, Ashley Monique Clark, Elimu Nelson, Nichole Robinson, Melissa Schuman",
          "date_added" : "2021-09-01 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "fWN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 86,
          "show_id" : "s164",
          "director" : "David Zucker",
          "release_year" : 2003,
          "rating" : "R",
          "description" : "A young man house-sits for his mean boss, hoping to use it as an opportunity to win the heart of the boss's daughter, on whom he's long had a crush.",
          "type" : "Movie",
          "title" : "My Boss's Daughter",
          "duration_tv" : "86",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Ashton Kutcher, Tara Reid, Jeffrey Tambor, Andy Richter, Michael Madsen, Jon Abrahams, David Koechner, Carmen Electra, Kenan Thompson, Terence Stamp, Molly Shannon",
          "date_added" : "2021-09-01 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "jWN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 95,
          "show_id" : "s180",
          "director" : "Tom Shadyac",
          "release_year" : 1996,
          "rating" : "PG-13",
          "description" : "After being made fun of for his weight, a kind and brainy professor takes a dose of a revolutionary formula that changes more than just his appearance.",
          "type" : "Movie",
          "title" : "The Nutty Professor",
          "duration_tv" : "95",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Eddie Murphy, Jada Pinkett Smith, James Coburn, Larry Miller, Dave Chappelle, John Ales, Patricia Wilson, Jamal Mixon",
          "date_added" : "2021-09-01 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "jmN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "NULL",
          "duration_movies" : 107,
          "show_id" : "s181",
          "director" : "Peter Segal",
          "release_year" : 2000,
          "rating" : "PG-13",
          "description" : "After getting engaged, Sherman Klump prepares for his big day. But his sinister alter ego Buddy Love threatens to ruin his wedding and reputation.",
          "type" : "Movie",
          "title" : "The Nutty Professor II: The Klumps",
          "duration_tv" : "107",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Eddie Murphy, Janet Jackson, Larry Miller, John Ales, Richard Gant, Anna Maria Horsford, Melinda McGraw, Jamal Mixon, Gabriel Williams, Chris Elliott",
          "date_added" : "2021-09-01 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "nmN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "NULL",
          "duration_movies" : 92,
          "show_id" : "s197",
          "director" : "Mark Waters",
          "release_year" : 2021,
          "rating" : "TV-14",
          "description" : "An influencer specializing in makeovers bets she can transform an unpopular classmate into prom king in this remake of the teen classic \"She's All That.\"",
          "type" : "Movie",
          "title" : "He's All That",
          "duration_tv" : "92",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Addison Rae, Tanner Buchanan, Rachael Leigh Cook, Madison Pettis, Isabella Crovetti, Matthew Lillard, Peyton Meyer, Annie Jacob, Myra Molloy, Kourtney Kardashian",
          "date_added" : "2021-08-27 00:00:00",
          "month_added" : "August",
          "@timestamp" : "2021-08-27T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "32N9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "NULL",
          "duration_movies" : 97,
          "show_id" : "s262",
          "director" : "Bruno Garotti",
          "release_year" : 2021,
          "rating" : "TV-14",
          "description" : "Looking to shake things up, two best friends embark on a life-changing adventure abroad as exchange students. But can they stay out of trouble?",
          "type" : "Movie",
          "title" : "The Secret Diary of an Exchange Student",
          "duration_tv" : "97",
          "listed_in" : "Comedies,InternationalMovies,RomanticMovies",
          "cast" : "Larissa Manoela, Thati Lopes, Bruno Montaleone, David Sherod James, Maiara Walsh, Flávia Garrafa, Kathy-Ann Hart, Ray Faiola, Noa Graham",
          "date_added" : "2021-08-18 00:00:00",
          "month_added" : "August",
          "@timestamp" : "2021-08-18T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "9mN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedKingdom UnitedStates",
          "duration_movies" : 114,
          "show_id" : "s285",
          "director" : "Vince Marcello",
          "release_year" : 2021,
          "rating" : "TV-14",
          "description" : "Determined to make the most of her final summer before college, Elle plans the ultimate bucket list as she navigates what comes next with Noah and Lee.",
          "type" : "Movie",
          "title" : "The Kissing Booth 3",
          "duration_tv" : "114",
          "listed_in" : "Comedies,RomanticMovies",
          "cast" : "Joey King, Joel Courtney, Jacob Elordi, Molly Ringwald, Taylor Zakhar Perez, Maisie Richardson-Sellers, Meganne Young, Stephen Jennings",
          "date_added" : "2021-08-11 00:00:00",
          "month_added" : "August",
          "@timestamp" : "2021-08-11T00:00:00.000+05:30"
        }
      }
    ]
  }
}

# Find all the movies that can be categorized as “adventure” and “thriller”

# QUERY:
GET /netflix_index/_search
{
  "query": {
    "bool": {
      "must": [
        {"wildcard": {"listed_in": "*Action&Adventure*"}},
        {"wildcard": {"listed_in": "*Thrillers*"}}
      ]
    }
  }
}

# OUTPUT:
{
  "took" : 7,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 11,
      "relation" : "eq"
    },
    "max_score" : 2.0,
    "hits" : [
      {
        "_index" : "netflix_index",
        "_id" : "BWN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 98,
          "show_id" : "s44",
          "director" : "Joe Alves",
          "release_year" : 1983,
          "rating" : "PG",
          "description" : "After the staff of a marine theme park try to capture a young great white shark, they discover its mother has invaded the enclosure and is out for blood.",
          "type" : "Movie",
          "title" : "Jaws 3",
          "duration_tv" : "98",
          "listed_in" : "Action&Adventure,HorrorMovies,Thrillers",
          "cast" : "Dennis Quaid, Bess Armstrong, Simon MacCorkindale, Louis Gossett Jr., John Putch, Lea Thompson, P.H. Moriarty, Dan Blasko, Liz Morris, Lisa Maurer",
          "date_added" : "2021-09-16 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-16T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "BmN9kn8BrsJefGjvOV3U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 91,
          "show_id" : "s45",
          "director" : "Joseph Sargent",
          "release_year" : 1987,
          "rating" : "PG-13",
          "description" : "After another deadly shark attack, Ellen Brody has had enough of Amity Island and moves to the Caribbean – but a great white shark follows her there.",
          "type" : "Movie",
          "title" : "Jaws: The Revenge",
          "duration_tv" : "91",
          "listed_in" : "Action&Adventure,HorrorMovies,Thrillers",
          "cast" : "Lorraine Gary, Lance Guest, Mario Van Peebles, Karen Young, Michael Caine, Judith Barsi, Mitchell Anderson, Lynn Whitfield",
          "date_added" : "2021-09-16 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2021-09-16T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "LmN9kn8BrsJefGjvOV7U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates UnitedKingdom",
          "duration_movies" : 148,
          "show_id" : "s341",
          "director" : "Christopher Nolan",
          "release_year" : 2010,
          "rating" : "PG-13",
          "description" : "A troubled thief who extracts secrets from people's dreams takes one last job: leading a dangerous mission to plant an idea in a target's subconscious.",
          "type" : "Movie",
          "title" : "Inception",
          "duration_tv" : "148",
          "listed_in" : "Action&Adventure,Sci-Fi&Fantasy,Thrillers",
          "cast" : "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy, Ken Watanabe, Dileep Rao, Cillian Murphy, Tom Berenger, Marion Cotillard, Pete Postlethwaite, Michael Caine, Lukas Haas",
          "date_added" : "2021-08-01 00:00:00",
          "month_added" : "August",
          "@timestamp" : "2021-08-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "RWN9kn8BrsJefGjvOV7U",
        "_score" : 2.0,
        "_source" : {
          "country" : "NULL",
          "duration_movies" : 118,
          "show_id" : "s364",
          "director" : "Jaume Balagueró",
          "release_year" : 2021,
          "rating" : "R",
          "description" : "A genius engineer and his crew of amateur thieves plot a scheme to seize a legendary lost treasure hidden in a fortress beneath the Bank of Spain.",
          "type" : "Movie",
          "title" : "The Vault",
          "duration_tv" : "118",
          "listed_in" : "Action&Adventure,InternationalMovies,Thrillers",
          "cast" : "Freddie Highmore, Astrid Bergès-Frisbey, Sam Riley, Liam Cunningham, José Coronado, Luis Tosar, Emilio Gutiérrez Caba, Axel Stein, Daniel Holguín, Famke Janssen",
          "date_added" : "2021-07-31 00:00:00",
          "month_added" : "July",
          "@timestamp" : "2021-07-31T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "EWN9kn8BrsJefGjvOV_U",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 108,
          "show_id" : "s568",
          "director" : "Frank Marshall",
          "release_year" : 1995,
          "rating" : "PG-13",
          "description" : "Eight people, some with ulterior motives, go on an expedition to the Congo, where they find a lost city protected by killer apes.",
          "type" : "Movie",
          "title" : "Congo",
          "duration_tv" : "108",
          "listed_in" : "Action&Adventure,Thrillers",
          "cast" : "Dylan Walsh, Laura Linney, Ernie Hudson, Tim Curry, Joe Don Baker, Grant Heslov, Adewale Akinnuoye-Agbaje, Mary Ellen Trainor",
          "date_added" : "2021-07-01 00:00:00",
          "month_added" : "July",
          "@timestamp" : "2021-07-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "lWN9kn8BrsJefGjvOWLV",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedKingdom Germany France UnitedStates",
          "duration_movies" : 113,
          "show_id" : "s1468",
          "director" : "Jaume Collet-Serra",
          "release_year" : 2011,
          "rating" : "PG-13",
          "description" : "Liam Neeson stars as a man who regains consciousness after a car accident, only to discover that another man is impersonating him.",
          "type" : "Movie",
          "title" : "Unknown",
          "duration_tv" : "113",
          "listed_in" : "Action&Adventure,Thrillers",
          "cast" : "Liam Neeson, Diane Kruger, January Jones, Aidan Quinn, Bruno Ganz, Frank Langella, Sebastian Koch, Olivier Schneider, Stipe Erceg, Rainer Bock",
          "date_added" : "2021-01-01 00:00:00",
          "month_added" : "January",
          "@timestamp" : "2021-01-01T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "X9V9kn8BHcUouyoQQ-bm",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates",
          "duration_movies" : 168,
          "show_id" : "s5204",
          "director" : "Quentin Tarantino",
          "release_year" : 2015,
          "rating" : "R",
          "description" : "Years after the Civil War, a bounty hunter and his captive are waylaid by a Wyoming blizzard and hole up in a way station with six dicey strangers.",
          "type" : "Movie",
          "title" : "The Hateful Eight",
          "duration_tv" : "168",
          "listed_in" : "Action&Adventure,Thrillers",
          "cast" : "Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins, Demián Bichir, Tim Roth, Michael Madsen, Bruce Dern, James Parks, Dana Gourrier, Channing Tatum, Zoë Bell",
          "date_added" : "2017-10-25 00:00:00",
          "month_added" : "October",
          "@timestamp" : "2017-10-25T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "KtV9kn8BHcUouyoQQ-vn",
        "_score" : 2.0,
        "_source" : {
          "country" : "Norway",
          "duration_movies" : 77,
          "show_id" : "s6436",
          "director" : "Henrik Martin Dahlsbakken",
          "release_year" : 2016,
          "rating" : "TV-MA",
          "description" : "Torn between old camaraderie and recent tensions, three ex-soldiers reunite to explore a deadly cave but soon discover terror beyond all expectations.",
          "type" : "Movie",
          "title" : "Cave",
          "duration_tv" : "77",
          "listed_in" : "Action&Adventure,InternationalMovies,Thrillers",
          "cast" : "Heidi Toini, Benjamin Helstad, Mads Sjogard Pettersen, Ingar Helge Gimle",
          "date_added" : "2017-06-15 00:00:00",
          "month_added" : "June",
          "@timestamp" : "2017-06-15T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "5NV9kn8BHcUouyoQQ-zn",
        "_score" : 2.0,
        "_source" : {
          "country" : "UnitedStates UnitedKingdom Denmark Sweden",
          "duration_movies" : 90,
          "show_id" : "s6880",
          "director" : "Henrik Ruben Genz",
          "release_year" : 2014,
          "rating" : "R",
          "description" : "A struggling couple can't believe their luck when they find a stash of money in the apartment of a neighbor who was recently murdered.",
          "type" : "Movie",
          "title" : "Good People",
          "duration_tv" : "90",
          "listed_in" : "Action&Adventure,Thrillers",
          "cast" : "James Franco, Kate Hudson, Tom Wilkinson, Omar Sy, Sam Spruell, Anna Friel, Thomas Arnold, Oliver Dimsdale, Diana Hardcastle, Michael Jibson, Diarmaid Murtagh",
          "date_added" : "2017-09-08 00:00:00",
          "month_added" : "September",
          "@timestamp" : "2017-09-08T00:00:00.000+05:30"
        }
      },
      {
        "_index" : "netflix_index",
        "_id" : "V2N9kn8BrsJefGjvR3IR",
        "_score" : 2.0,
        "_source" : {
          "country" : "France UnitedStates",
          "duration_movies" : 2,
          "show_id" : "s8148",
          "director" : "NULL",
          "release_year" : 2018,
          "rating" : "TV-14",
          "description" : "After a personal tragedy upends his life, a highly skilled former Green Beret is drawn into a career as a secret government operative.",
          "type" : "TV Show",
          "title" : "Taken",
          "duration_tv" : "2 Seasons",
          "listed_in" : "CrimeTVShows,TVAction&Adventure,TVThrillers",
          "cast" : "Clive Standen, Jennifer Beals, Gaius Charles, Brooklyn Sudano, Monique Gabriela Curnen, Michael Irby, James Landry Hébert, Jose Pablo Cantillo, James Landry Hebert",
          "date_added" : "2019-01-12 00:00:00",
          "month_added" : "January",
          "@timestamp" : "2019-01-12T00:00:00.000+05:30"
        }
      }
    ]
  }
}
