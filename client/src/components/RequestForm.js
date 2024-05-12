import React, { useState } from 'react';
import './RequestForm.css';

function RequestForm() {
  const [form, setForm] = useState({
    a1Type: '',
    destination: '',
    travelPurpose: '',
    travelDate: '',
    status: 0  // Předpokládáme, že status je procento dokončení
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    // Zde byste poslali data na server nebo další logiku
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Žádost o A1</h1>
      <label>Vybrat druh A1: 
        <select value={form.a1Type} onChange={e => setForm({...form, a1Type: e.target.value})}>
          <option value="typ1">Země EU a EHP</option>
          <option value="typ2">Země mimo EU a EHP</option>
        </select>
      </label>
      <label>Destinace:
      <input type="text" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} />
      </label>
      <label>Účel cesty:
        <input type="text" value={form.travelPurpose} onChange={e => setForm({...form, travelPurpose: e.target.value})} />
      </label>
      <label>Datum cesty:
        <input type="date" value={form.travelDate} onChange={e => setForm({...form, travelDate: e.target.value})} />
      </label>
      <button type="submit">Podat žádost</button>
    </form>
  );
}

export default RequestForm;
