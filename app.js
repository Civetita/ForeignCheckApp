const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

const userController = require('../Modules/Users/userController');
const documentController = require('../Modules/Documents/documentController');
const requestController = require('../Modules/Requests/requestController');

// Základní route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Autentizační endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = userController.authenticateUser(username, password);
  if (user) {
    res.status(200).json({ message: 'Logged in successfully', user });
  } else {
    res.status(401).send('Authentication failed');
  }
});

// Endpointy pro uživatele
app.get('/users', (req, res) => {
  res.json(userController.getUsers());
});

app.post('/users', (req, res) => {
  const newUser = userController.addUser(req.body);
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).send('Error creating user');
  }
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = userController.updateUser(userId, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userDeleted = userController.deleteUser(userId);
  if (userDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

// Endpointy pro dokumenty
app.get('/documents', (req, res) => {
  res.json(documentController.getDocuments());
});

app.post('/documents', (req, res) => {
  const newDocument = documentController.addDocument(req.body);
  if (newDocument) {
    res.status(201).json(newDocument);
  } else {
    res.status(500).send('Error creating document');
  }
});

app.put('/documents/:id', (req, res) => {
  const documentId = parseInt(req.params.id, 10);
  const updatedDocument = documentController.updateDocument(documentId, req.body);
  if (updatedDocument) {
    res.json(updatedDocument);
  } else {
    res.status(404).send('Document not found');
  }
});

app.delete('/documents/:id', (req, res) => {
  const documentId = parseInt(req.params.id, 10);
  const documentDeleted = documentController.deleteDocument(documentId);
  if (documentDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send('Document not found');
  }
});

// Endpointy pro žádosti
app.get('/requests', (req, res) => {
  res.json(requestController.getRequests());
});

app.post('/requests', (req, res) => {
  const newRequest = requestController.addRequest(req.body);
  if (newRequest) {
    res.status(201).send('Request created');
  } else {
    res.status(500).send('Error creating request');
  }
});

app.put('/requests/:id', (req, res) => {
  const requestId = parseInt(req.params.id, 10);
  const updatedRequest = requestController.updateRequest(requestId, req.body);
  if (updatedRequest) {
    res.send('Request updated');
  } else {
    res.status(404).send('Request not found');
  }
});

app.delete('/requests/:id', (req, res) => {
  const requestId = parseInt(req.params.id, 10);
  const requestDeleted = requestController.deleteRequest(requestId);
  if (requestDeleted) {
    res.send('Request deleted');
  } else {
    res.status(404).send('Request not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
