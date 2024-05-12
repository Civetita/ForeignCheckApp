import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Users from './components/Users';
import Messages from './components/Messages';
import Requests from './components/Requests';
import RequestForm from './components/RequestForm';
import InvitationRequestForm from './components/InvitationRequestForm';
import DocumentControl from './components/DocumentControl';

function App() {
  const [view, setView] = useState('home');  
  const [role, setRole] = useState('user');
  const [messages, setMessages] = useState([]);

  function handleInvitationSubmit(data) {
    console.log('Submitting invitation request:', data);

    const apiUrl = 'http://localhost:3000/api/letters';

    fetch(apiUrl, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(data)  
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();  
    })
    .then(data => {
      console.log('Success:', data);  
    })
    .catch(error => {
      console.error('Error:', error);  
    });
  }

  return (
    <div className="App">
      <Header setView={setView} setRole={setRole} role={role} />
      <Messages messages={messages} setMessages={setMessages} />
      {view === 'requestA1' && <RequestForm />}
      {view === 'home' && <Home />}
      {view === 'documents' && <Documents />}
      {view === 'users' && <Users />}
      {view === 'requests' && <Requests />}
      {view === 'invitationRequest' && <InvitationRequestForm onSubmit={handleInvitationSubmit} />}
      {view === 'documentControl' && <DocumentControl role={role} />}
    </div>
  );
}

export default App;
