import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
from joblib import dump

df = pd.read_csv('Phishing_Email.csv')

# drop unnamed column in dataset
df.drop(df.columns[0], axis=1, inplace=True)

# Replace y with 0 and 1
df['Email Type'] = df['Email Type'].replace('Safe Email', 0)
df['Email Type'] = df['Email Type'].replace('Phishing Email', 1)
print(df)


# Drop columns with any NaN values
df.dropna(inplace=True)

# Features X, Target y
X = df['Email Text']
y = df['Email Type']

# Split X and y into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize features so ML model can understand text semantically
tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
X_test_tfidf = tfidf_vectorizer.transform(X_test)

# Train model
log_reg_model = LogisticRegression()
log_reg_model.fit(X_train_tfidf, y_train)

# Evaluate model
y_pred = log_reg_model.predict(X_test_tfidf)
print(classification_report(y_test, y_pred))
print("Accuracy:", accuracy_score(y_test, y_pred))

# Save the logistic regression model
dump(log_reg_model, 'log_reg_model.joblib')

# Save the vectorizer
dump(tfidf_vectorizer, 'tfidf_vectorizer.joblib')