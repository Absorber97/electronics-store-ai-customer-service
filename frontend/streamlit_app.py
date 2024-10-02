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
    if 'customer_query' not in st.session_state or not st.session_state.customer_query:
        with st.spinner("Generating initial question..."):
            response = requests.get(f"http://localhost:3000/api/generate-question?language={language}&type=Change Product")
            if response.status_code == 200:
                data = response.json()
                st.session_state.customer_query = data["question"]
                st.session_state.current_product_name = data["productName"]
            else:
                st.error("Failed to generate an initial question. Please try again.")
    
    generation_type = st.radio("Generation Type", ["Change Product", "Change Comment Type"])
    
    if st.button("Generate New Question"):
        with st.spinner("Generating new question..."):
            response = requests.get(f"http://localhost:3000/api/generate-question?language={language}&type={generation_type}")
            if response.status_code == 200:
                data = response.json()
                st.session_state.customer_query = data["question"]
                st.session_state.current_product_name = data["productName"]
                st.success("New question generated!")
            else:
                st.error("Failed to generate a new question. Please try again.")
    
    customer_query = st.text_area("Generated question:", value=st.session_state.customer_query, height=300)
    
    # Display current product information
    if 'current_product_name' in st.session_state:
        st.markdown(f"**Current Product:** {st.session_state.current_product_name}")

with col2:
    st.header("Answer")
    answer_placeholder = st.empty()

# Submit button below the columns
if st.button("Submit"):
    if customer_query:
        with st.spinner("Processing your query..."):
            response = requests.post("http://localhost:3000/api/customer-service", json={"query": customer_query, "language": language})
            
            if response.status_code == 200:
                data = response.json()
                answer_placeholder.write(data["email"])
                st.success("Response generated successfully!")
            else:
                answer_placeholder.error("An error occurred. Please try again.")
    else:
        answer_placeholder.warning("Please generate a question before submitting.")