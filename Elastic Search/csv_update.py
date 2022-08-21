import pandas as pd

csv_file = pd.read_csv("netflix_titles.csv")

csv_file["date_added"] = pd.to_datetime(csv_file["date_added"])

# Add month added field to dataframe in month name format
csv_file["month_added"] = csv_file["date_added"].dt.strftime("%B")

# Change duration field to numeric format (from 90 min to 90) if it is Movie
csv_file["duration"] = csv_file["duration"].str.replace(" min", "")

# Split duration to two columns for tv shows and movies
csv_file["duration_movies"] = csv_file["duration"].str.split(" ").str[0]
csv_file["duration_tv"] = csv_file["duration"]

# drop duration column
csv_file.drop("duration", axis=1, inplace=True)

# tokenize country field and change countries like 'United States' to 'UnitedStates'
csv_file["country"] = csv_file["country"].str.replace(" ", "")
csv_file["country"] = csv_file["country"].str.replace(",", " ")

# tokenize listed in field
csv_file["listed_in"] = csv_file["listed_in"].str.replace(" ", "")

csv_file.fillna("NULL", inplace=True)

csv_file.to_csv("netflix_titles_updated.csv", index=False)
