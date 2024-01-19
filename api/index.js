const express = require('express');
const app = express();
const port = 8000;
const { Vigenere } = require('caesar-salad');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/encode', (req, res) => {
    const { password, message } = req.body;
    if (!password || !message) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const encodedText = Vigenere.Cipher(password).crypt(message);
    res.json({ encoded: encodedText });
});

app.post('/decode', (req, res) => {
    const { password, message } = req.body;
    if (!password || !message) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const decodedText = Vigenere.Decipher(password).crypt(message);
    res.json({ decoded: decodedText });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});