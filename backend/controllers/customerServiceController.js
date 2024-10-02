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

exports.handleCustomerQuery = async (req, res) => {
  const { query, language } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a customer service assistant for an electronics store." },
        { role: "user", content: `Query: ${query}\nLanguage: ${language}\nProduct Data: ${JSON.stringify(productsData)}\nCategory Data: ${JSON.stringify(categoriesData)}` }
      ],
    });

    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};