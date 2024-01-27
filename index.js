const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());

app.get('/kshitiz', async (req, res) => {
    const userContent = req.query.content;

    if (!userContent) {
        return res.status(400).json({ error: 'Missing content parameter in the query' });
    }

    const options = {
        method: 'POST',
        url: 'https://adult-gpt.p.rapidapi.com/adultgpt',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'ece5655ae3msh55483dd9d60402fp12e36ajsn5adc6b59bc68',
            'X-RapidAPI-Host': 'adult-gpt.p.rapidapi.com',
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: userContent,
                },
            ],
            genere: 'ai-gf-2',
            bot_name: '',
            temperature: 0.9,
            top_k: 10,
            top_p: 0.9,
            max_tokens: 200,
        },
    };

    try {
        const response = await axios.request(options);
        const chatResult = response.data.result;
        res.json({ chatResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
