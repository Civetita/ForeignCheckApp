const Document = require('./documentModel');
const fs = require('fs');
const path = require('path');

const documentsFilePath = path.join(__dirname, 'document.json');

function readDocuments() {
    try {
        const documentsData = fs.readFileSync(documentsFilePath, 'utf8');
        return JSON.parse(documentsData);
    } catch (error) {
        console.error('Read error:', error);
        return [];
    }
}

function writeDocuments(data) {
    try {
        fs.writeFileSync(documentsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Write error:', error);
    }
}

function getDocuments() {
    return readDocuments();
}

function addDocument(documentData, userId) {
    const documents = readDocuments();
    const newDocument = new Document(
      documents.length + 1,
      userId,
      documentData.holderName,
      documentData.docType,
      documentData.docNumber,
      documentData.issueDate,
      documentData.validUntil,
      documentData.docStatus
    );
    documents.push(newDocument);
    writeDocuments(documents);
    return newDocument;
  }

function updateDocument(id, updateData) {
    let documents = readDocuments();
    const documentIndex = documents.findIndex(doc => doc.id === id);
    if (documentIndex !== -1) {
        // Zde aktualizujeme dokument s použitím dat z updateData
        documents[documentIndex] = { ...documents[documentIndex], ...updateData };
        writeDocuments(documents);
        return documents[documentIndex]; // Vracíme aktualizovaný dokument
    }
    return null; // Pokud dokument nebyl nalezen, vracíme null
}

function deleteDocument(id) {
    let documents = readDocuments();
    const newDocuments = documents.filter(doc => doc.id !== id);
    if (documents.length !== newDocuments.length) {
        writeDocuments(newDocuments);
        return true; // Úspěšné smazání
    }
    return false; // Dokument nebyl nalezen
}

module.exports = {
    getDocuments,
    addDocument,
    updateDocument,
    deleteDocument
};
