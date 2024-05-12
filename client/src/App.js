import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Documents from './components/Documents';
import Users from './components/Users';
import Messages from './components/Messages';
import Requests from './components/Requests';
import RequestForm from './components/RequestForm';

function App() {
  const [view, setView] = useState('home', 'documents', 'users');  // 'home', 'documents', 'users'
  const [role, setRole] = useState('user');  // Přepínání mezi 'admin' a 'user'
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <Header setView={setView} setRole={setRole} role={role} />
      <Messages messages={messages} setMessages={setMessages} />
      {view === 'home' && <Home />}
      {view === 'documents' && <Documents />}
      {view === 'users' && <Users />}
      {view === 'requests' && <Requests />}
    </div>
  );
}

export default App;