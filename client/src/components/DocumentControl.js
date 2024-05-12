import React, { useState, useEffect } from 'react';

function DocumentControl({ role }) {
  const [documents, setDocuments] = useState([]);
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    // Načíst dokumenty z API při načtení komponenty
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const toggleEditMode = (id) => {
    setEditMode((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEdit = (id, field, value) => {
    setDocuments(docs =>
      docs.map(doc => doc.id === id ? { ...doc, [field]: value } : doc)
    );
  };

  const saveChanges = async (doc) => {
    // Implementovat uložení dokumentu na server
    const response = await fetch(`/api/documents/${doc.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    });
    if (response.ok) {
      toggleEditMode(doc.id);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Jméno</th>
            <th>Typ dokumentu</th>
            <th>Datum expirace</th>
            {['HR', 'Admin'].includes(role) && <th>Akce</th>}
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>
                {editMode[doc.id] ? <input type="text" value={doc.holderName} onChange={(e) => handleEdit(doc.id, 'holderName', e.target.value)} /> : doc.holderName}
              </td>
              <td>
                {editMode[doc.id] ? <input type="text" value={doc.docType} onChange={(e) => handleEdit(doc.id, 'docType', e.target.value)} /> : doc.docType}
              </td>
              <td>
                {editMode[doc.id] ? <input type="date" value={doc.validUntil} onChange={(e) => handleEdit(doc.id, 'validUntil', e.target.value)} /> : doc.validUntil}
              </td>
              {['HR', 'Admin'].includes(role) && (
                <td>
                  {editMode[doc.id] ? (
                    <button onClick={() => saveChanges(doc)}>Uložit</button>
                  ) : (
                    <button onClick={() => toggleEditMode(doc.id)}>Editovat</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentControl;
