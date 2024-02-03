from joblib import load
from openai import OpenAI
import os

class PhishingModel:
    def __init__(self):
        current_dir = os.path.dirname(os.path.realpath(__file__))  # Get the current directory of the script
        self.log_reg_model = load(os.path.join(current_dir, 'log_reg_model.joblib'))
        self.tfidf_vectorizer = load(os.path.join(current_dir, 'tfidf_vectorizer.joblib'))

    # Function that returns probability of email being a phishing attack
    def predict_phishing(self, email_text):
        # Vectorize email text so log reg model can interpret
        transformed_email = self.tfidf_vectorizer.transform([email_text])
        # Predict if email is phishing attack
        phishing_probability = self.log_reg_model.predict_proba(transformed_email)[0][1]
        return phishing_probability

    def analyze_email(self, email_text):
        phishing_probability = self.predict_phishing(email_text)
        if phishing_probability < 0.5:
            return phishing_probability * 100, "This email should be safe."
        print("Phishing email detected! Analyzing email...")
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a cyber security analyst, skilled in analyzing phishing emails. Do not write anything but the analysis."},
                {"role": "user", "content": f"Your task is to write a short analysis on this phishing email:\n\n {email_text}"}
            ]
        )
    
        return phishing_probability * 100, completion.choices[0].message.content