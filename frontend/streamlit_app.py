import streamlit as st
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

st.set_page_config(page_title="Electronics Store Customer Service", layout="wide")

st.title("Electronics Store Customer Service")

# Language selection at the top
language = st.selectbox("Language", ["English", "Spanish", "French", "German", "Italian"])

# Create two columns for Question and Answer
col1, col2 = st.columns(2)

with col1:
    st.header("Question")
    customer_query = st.text_area("Enter your question here:", height=300)

with col2:
    st.header("Answer")
    answer_placeholder = st.empty()

# Submit button below the columns
if st.button("Submit"):
    if customer_query:
        # Send request to backend
        response = requests.post("http://localhost:3000/api/customer-service", json={"query": customer_query, "language": language})
        
        if response.status_code == 200:
            data = response.json()
            
            # Display the answer in the right column
            answer_placeholder.write(data["email"])
        else:
            answer_placeholder.error("An error occurred. Please try again.")
    else:
        answer_placeholder.warning("Please enter a question before submitting.")