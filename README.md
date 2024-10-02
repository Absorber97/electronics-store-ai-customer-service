# Electronics Store AI Customer Service

This project implements an AI-powered customer service system for an electronics store using Node.js, Python, Streamlit, and OpenAI's GPT model.

## Features

- Generate random customer queries about electronics products
- Process customer queries and generate appropriate responses
- Multi-language support (English, Spanish, French, German, Italian)
- Sentiment analysis of customer comments
- Email subject and body generation for customer service responses

## Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- OpenAI API key

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/Absorber97/electronics-store-ai-customer-service.git
   cd electronics-store-ai-customer-service
   ```

2. Install Node.js dependencies:
   ```
   npm install
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up your OpenAI API key:
   - Rename `.env.example` to `.env`
   - Add your OpenAI API key to the `.env` file:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

## Running the Application

Use the provided script to run both the backend server and the Streamlit frontend:

```
npm run app
```

This will start the Node.js server and launch the Streamlit app in your default web browser.

## Usage

1. Select your preferred language from the dropdown menu.
2. Choose between "Change Product" or "Change Comment Type" to generate a new customer query.
3. Click "Generate New Question" to get a random customer query.
4. The generated query will appear in the text area on the left side of the interface.
5. Click "Submit" to process the query and generate a customer service response.
6. The response, including the email subject and body, will appear on the right side of the interface.

## Project Structure

```
electronics-store-ai-customer-service/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── app.js
├── frontend/
│   └── streamlit_app.py
├── data/
│   ├── categories.json
│   ├── detailed_descriptions.json
│   └── products.json
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── requirements.txt
└── run_app.sh
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
