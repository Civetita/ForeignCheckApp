const fs = require('fs');
const path = require('path'); 
const usersFilePath = "C:\\Users\\TheAa\\OneDrive\\Obrázky\\Plocha\\ForeignCheck\\Database\\user.json";

function readUsersData() {
    try {
        const jsonData = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Read error', error);
        return [];
    }
}

function writeUsersData(data) {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

function getUsers() {
    return readUsersData();
}

function addUser(user) {
    const users = readUsersData();
    user.id = users.length + 1; // Generování ID
    users.push(user);
    writeUsersData(users);
    return user;
}

function authenticateUser(username, password) {
    const users = readUsersData();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      return user;
    }
    
    return null;
  }

function getUserById(id) {
    const users = readUsersData();
    return users.find(user => user.id === id);
}

function updateUser(id, updateInfo) {
    const users = readUsersData();
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = {...users[index], ...updateInfo};
        writeUsersData(users);
        return users[index];
    }
    return null;
}

function deleteUser(id) {
    let users = readUsersData();
    const updatedUsers = users.filter(user => user.id !== id);
    writeUsersData(updatedUsers);
    return users.length !== updatedUsers.length;
}

module.exports = {
    getUsers,
    addUser,
    authenticateUser,
    getUserById,
    updateUser,
    deleteUser
};