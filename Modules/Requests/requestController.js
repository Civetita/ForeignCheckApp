const Request = require('./requestModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const requestsFilePath = path.join(__dirname, 'requests.json');

function readRequests() {
    try {
        const requestsData = fs.readFileSync(requestsFilePath, 'utf8');
        return JSON.parse(requestsData);
    } catch (error) {
        console.error('Error reading requests:', error);
        return [];
    }
}

function writeRequests(data) {
    try {
        fs.writeFileSync(requestsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing requests:', error);
        throw new Error('Failed to write requests data');
    }
}

function getRequests() {
    return readRequests();
}

function addRequest(requestData) {
    const requests = readRequests();
    const newRequest = new Request(
        uuidv4(),
        requestData.userId,
        requestData.type,
        new Date().toISOString(),
        requestData.status,
        requestData.details,
        requestData.notes
    );
    requests.push(newRequest);
    writeRequests(requests);
    return newRequest;
}

function updateRequest(id, updateData) {
    let requests = readRequests();
    const requestIndex = requests.findIndex(req => req.id === id);
    if (requestIndex !== -1) {
        requests[requestIndex] = { ...requests[requestIndex], ...updateData };
        writeRequests(requests);
        return true; // Return true to indicate success
    }
    return false; // Return false if the request was not found
}

function deleteRequest(id) {
    let requests = readRequests();
    const initialLength = requests.length;
    requests = requests.filter(req => req.id !== id);
    writeRequests(requests);
    return requests.length !== initialLength; // Return true if something was deleted
}

module.exports = {
    getRequests,
    addRequest,
    updateRequest,
    deleteRequest
};
