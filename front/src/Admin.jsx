import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHomePage = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:4000/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleLogout = () => {
        
        console.log('Logout clicked');
        window.location.href='/'

    };

    return (
        <div className="container">
            <h1 className="title">Admin Home Page</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <table className="candidates-table">
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Party</th>
                        <th>Age</th>
                        <th>Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate, index) => (
                        <tr key={index} className="candidate-row">
                            <td>{candidate.name}</td>
                            <td>{candidate.party}</td>
                            <td>{candidate.age}</td>
                            <td>{candidate.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style>{`
                .container {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                }

                .title {
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .logout-button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #f44336; /* Red color */
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 20px;
                }

                .candidates-table {
                    border-collapse: collapse;
                    width: 100%;
                }

                .candidates-table th, .candidates-table td {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                }

                .candidates-table th {
                    background-color: #4CAF50; /* Green color */
                    color: white;
                }

                .candidates-table tbody tr:nth-child(even) {
                    background-color: #f2f2f2; /* Light gray color for even rows */
                }
            `}</style>
        </div>
    );
};

export default AdminHomePage;
