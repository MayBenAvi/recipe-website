const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

app.post('/get-recipes', async (req, res) => {
    const { allergies, mood, leftovers } = req.body;

    try {
        const prompt = `Suggest a recipe based on these inputs:
        - Allergies: ${allergies.join(', ')}
        - Mood: ${mood}
        - Leftovers: ${leftovers.join(', ')}`;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 150,
        });

        const recipes = response.data.choices[0].text.trim();
        res.json({ recipes: [recipes] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
