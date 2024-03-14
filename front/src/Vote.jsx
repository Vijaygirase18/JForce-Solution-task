import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VotePage() {
    const [candidates, setCandidates] = useState([]); 
    const [selectedCandidate, setSelectedCandidate] = useState(''); 
    const [error, setError] = useState(null); 
    const [votedMessage, setVotedMessage] = useState(''); 

    useEffect(() => {
        fetchCandidates(); 
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:4000/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            setError('Failed to fetch candidates. Please try again later.');
        }
    };

    const handleCandidateSelection = (candidateId) => {
        setSelectedCandidate(candidateId);
    };

    const voteCandidate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/candidates/vote', { selectedCandidates: [selectedCandidate] }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message); 
            fetchCandidates(); 
            
            window.location.href = '/vote'; 
        } catch (error) {
            console.error('Error voting:', error);
            if (error.response && error.response.status === 400) {
                alert('You have already voted ');
            } else {
                alert('Failed to record vote. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h1>Candidates</h1>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ textAlign: 'left', backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>Party</th>
                            <th style={{ textAlign: 'left', backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>Age</th>
                            <th style={{ textAlign: 'left', backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{candidate.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{candidate.party}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{candidate.age}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <input
                                        type="radio"
                                        name="candidate"
                                        value={candidate._id}
                                        checked={selectedCandidate === candidate._id}
                                        onChange={() => handleCandidateSelection(candidate._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                    onClick={voteCandidate}
                >
                    Vote
                </button>
                {votedMessage && <div>{votedMessage}</div>}
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => window.location.href = '/'}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default VotePage;












