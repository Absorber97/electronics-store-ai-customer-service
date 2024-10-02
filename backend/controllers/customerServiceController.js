const { Configuration, OpenAIApi } = require("openai");
const config = require('../config/config');
const fs = require('fs');
const path = require('path');

const configuration = new Configuration({
  apiKey: config.openaiApiKey,
});
const openai = new OpenAIApi(configuration);

const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/products.json'), 'utf8'));
const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/categories.json'), 'utf8'));
const detailedDescriptions = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/detailed_descriptions.json'), 'utf8'));

function get_completion(prompt, model="gpt-3.5-turbo", temperature=0) {
  const messages = [{"role": "user", "content": prompt}];
  return openai.createChatCompletion({
    model: model,
    messages: messages,
    temperature: temperature,
  });
}

exports.handleCustomerQuery = async (req, res) => {
  const { query, language } = req.body;

  try {
    // Step 1: Generate customer's comment (simulating user input)
    const commentPrompt = `
    You are a customer of an electronics store. Based on the following product descriptions, write a 100-word comment or review about these products:
    ${JSON.stringify(detailedDescriptions)}
    `;
    const commentResponse = await get_completion(commentPrompt);
    const comment = commentResponse.data.choices[0].message.content.trim();

    // Step 2: Generate email subject (using inferring technique)
    const subjectPrompt = `
    What is the main topic of the following customer comment? Provide a short, concise email subject based on this topic.
    Customer comment: ${comment}
    `;
    const subjectResponse = await get_completion(subjectPrompt);
    const subject = subjectResponse.data.choices[0].message.content.trim();

    // Step 3: Generate summary of the customer's comment (using summarizing technique)
    const summaryPrompt = `
    Summarize the following customer comment in at most 30 words:
    ${comment}
    `;
    const summaryResponse = await get_completion(summaryPrompt);
    const summary = summaryResponse.data.choices[0].message.content.trim();

    // Step 4: Sentiment analysis of the customer's comment (using inferring technique)
    const sentimentPrompt = `
    What is the sentiment of the following customer comment? Answer with only "positive" or "negative".
    Customer comment: ${comment}
    `;
    const sentimentResponse = await get_completion(sentimentPrompt);
    const sentiment = sentimentResponse.data.choices[0].message.content.trim().toLowerCase();

    // Step 5: Generate an email to be sent to the customer (using expanding technique)
    const emailPrompt = `
    You are a customer service AI assistant for an electronics store. Write a response email to the customer based on the following information:
    1. Customer's comment: ${comment}
    2. Summary of the comment: ${summary}
    3. Sentiment of the comment: ${sentiment}
    4. Email subject: ${subject}

    The email should:
    - Be written in ${language}
    - Have a friendly and professional tone
    - Address the main points from the customer's comment
    - If the sentiment is negative, apologize and offer a solution
    - If the sentiment is positive, thank the customer for their feedback
    - Encourage the customer to reach out if they have any more questions

    Start the email with "Subject: ${subject}" on the first line, followed by the body of the email.
    `;
    const emailResponse = await get_completion(emailPrompt, "gpt-3.5-turbo", 0.7);
    const email = emailResponse.data.choices[0].message.content.trim();

    res.json({ 
      comment,
      subject,
      summary,
      sentiment,
      email
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};