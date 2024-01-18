const express = require('express');
const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;

const password = 'password';

app.get('/', (req, res) => {
    res.send('Homework 73');
});

app.get('/:word', (req, res) => {
   res.send(req.params.word);
});

app.get('/encode/:text', (req, res) => {
    const textEncode = req.params.text;
    const encodedText = Vigenere.Cipher(password).crypt(textEncode);
    res.send(encodedText);
});

app.get('/decode/:text', (req, res) => {
    const textDecode = req.params.text;
    const decodedText = Vigenere.Decipher(password).crypt(textDecode);
    res.send(decodedText);
});


app.listen(port, () => {});