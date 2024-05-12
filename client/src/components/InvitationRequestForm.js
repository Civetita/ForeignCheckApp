import React, { useState } from 'react';
import './InvitationRequestForm.css';

function InvitationRequestForm({ onSubmit }) {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    travelPurpose: '',
    passportNumber: '',
    embassy: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting invitation request:', form);
    onSubmit(form); // Odeslání dat na server nebo další logiku
  };

  return (
    <form onSubmit={handleSubmit} className="invitation-form">
      <h1>Žádost o zvací/vysílací dopis</h1>
      <label>
        Od kdy:
        <input type="date" name="startDate" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
      </label>
      <label>
        Do kdy:
        <input type="date" name="endDate" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
      </label>
      <label>
        Destinace:
        <input type="text" name="destination" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} />
      </label>
      <label>
        Účel cesty:
        <input type="text" name="travelPurpose" value={form.travelPurpose} onChange={e => setForm({...form, travelPurpose: e.target.value})} />
      </label>
      <label>
        Číslo pasu:
        <input type="text" name="passportNumber" value={form.passportNumber} onChange={e => setForm({...form, passportNumber: e.target.value})} />
      </label>
      <label>
        Ambasáda:
        <input type="text" name="embassy" value={form.embassy} onChange={e => setForm({...form, embassy: e.target.value})} />
      </label>
      <button type="submit">Podat žádost</button>
    </form>
  );
}

export default InvitationRequestForm;
