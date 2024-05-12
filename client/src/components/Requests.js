import React, { useState, useEffect } from 'react';
import './Requests.css';

function Requests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newRequest, setNewRequest] = useState({ type: '', details: '' }); // Základní struktura nové žádosti

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/requests');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRequests(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching requests:', error);
            setLoading(false);
        }
    };

    const handleAddRequest = async () => {
        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRequest)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const addedRequest = await response.json();
            setRequests([...requests, addedRequest]);  // Přidat novou žádost do seznamu
            setNewRequest({ type: '', details: '' });  // Reset formuláře
        } catch (error) {
            console.error('Failed to add new request:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/requests/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchRequests();  // Refresh requests after deletion
        } catch (error) {
            console.error('Failed to delete the request:', error);
        }
    };

    return (
        <div>
            <h1>Requests</h1>
            <div>
                <input
                    type="text"
                    placeholder="Type"
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Details"
                    value={newRequest.details}
                    onChange={(e) => setNewRequest({ ...newRequest, details: e.target.value })}
                />
                <button onClick={handleAddRequest}>Add Request</button>
            </div>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {requests.map(request => (
                        <li key={request.id}>
                            {request.type} - {request.details}
                            <button onClick={() => handleDelete(request.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Requests;