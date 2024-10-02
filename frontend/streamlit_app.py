import streamlit as st
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

st.set_page_config(page_title="Electronics Store Customer Service", layout="wide")

st.title("Electronics Store Customer Service")

# Language selection
language = st.selectbox("Select Language", ["English", "Spanish", "French"])

# Customer query input
customer_query = st.text_area("Enter your question:")

if st.button("Submit"):
    # Send request to backend
    response = requests.post("http://localhost:3000/api/customer-service", json={"query": customer_query, "language": language})
    
    if response.status_code == 200:
        answer = response.json()["answer"]
        st.success("Response received successfully!")
        st.write(answer)
    else:
        st.error("An error occurred. Please try again.")