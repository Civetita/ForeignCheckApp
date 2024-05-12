import React, { useState, useEffect } from 'react';
import './Documents.css';

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/documents');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDocuments(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/documents/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchDocuments();  // Refresh documents after deletion
        } catch (error) {
            console.error('Failed to delete the document:', error);
        }
    };

    return (
        <div>
            <h1>Documents</h1>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {documents.map(doc => (
                        <li key={doc.id}>
                            {doc.holderName} - {doc.docType}
                            <button onClick={() => handleDelete(doc.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Documents;
