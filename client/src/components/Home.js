import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Vítejte v aplikaci ForeignCheck</h1>
      <p>Toto je úvodní stránka naší aplikace. Zde můžete najít informace a odkazy na další užitečné zdroje.</p>
    </div>
  );
  
}
function Messages({ messages, setMessages }) {
  const handleMessageReply = (id) => {
    // Funkce pro odpověď na zprávu
  };

  const handleDeleteMessage = (id) => {
    // Funkce pro smazání zprávy
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleMarkAsRead = (id) => {
    // Funkce pro označení zprávy jako přečtené
  };

  return (
    <div className="messages">
      {messages.map(msg => (
        <div key={msg.id} className="message">
          <p>{msg.text}</p>
          <button onClick={() => handleMessageReply(msg.id)}>Odpovědět</button>
          <button onClick={() => handleDeleteMessage(msg.id)}>Smazat</button>
          <button onClick={() => handleMarkAsRead(msg.id)}>Přečteno</button>
        </div>
      ))}
    </div>
  );
}


export default Home;
