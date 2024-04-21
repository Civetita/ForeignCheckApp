const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./Database/userController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
app.get('/dashboard', (req, res) => {
    res.send('Secret Dashboard');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const result = userController.authenticateUser(email, password);
    if (result.auth) {
        res.status(200).send(result);
    } else {
        res.status(401).send('Login failed');
    }
});

app.get('/users', (req, res) => {
    res.json(userController.getUsers());
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
