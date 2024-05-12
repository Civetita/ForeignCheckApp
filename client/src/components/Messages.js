// V souboru Messages.js
import React from 'react';

function Messages({ messages, setMessages }) {
  // Zde může být logika pro manipulaci se zprávami
  return (
    <div className="messages">
      {messages.map(msg => (
        <div key={msg.id} className="message">
          <p>{msg.text}</p>
          <button onClick={() => console.log('Odpovídáme na zprávu')}>Odpovědět</button>
          <button onClick={() => console.log('Mažeme zprávu')}>Smazat</button>
          <button onClick={() => console.log('Označujeme zprávu jako přečtenou')}>Přečteno</button>
        </div>
      ))}
    </div>
  );
}

export default Messages;