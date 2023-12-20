import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar';

export default function NUsers() {
    const [users, setUsers] = useState([]);
    const [showDetails, setShowDetails] = useState({});

    useEffect(() => {
        async function fetchUsers() {
            const AT = JSON.parse(localStorage.getItem("at"));
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/users`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${AT}`,
                    },
                });
                const data = await response.json();
                setUsers(data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);

    const toggleDetails = (id) => {
        setShowDetails((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <>
            <div className="fixed top-0 w-full">
                <TopNavBar />
            </div>
            <div className="flex justify-center mt-8">
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-semibold text-center mb-6">Voter List</h1>
                    <div className="flex flex-col gap-4">
                        {users.map((user) => (
                            <div key={user.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl">{user.name}</h3>
                                    <button
                                        onClick={() => toggleDetails(user.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        {showDetails[user.id] ? '▼' : '►'}
                                    </button>
                                </div>
                                {showDetails[user.id] && (
                                    <div className="border-t mt-4 pt-4">
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Father's name:</strong> {user.father_name}</p>
                                        <p><strong>age:</strong> {user.age}</p>
                                        <p><strong>gender:</strong> {user.gender}</p>
                                        <p><strong>caste:</strong> {user.caste}</p>
                                        <p><strong>religion:</strong> {user.religion}</p>
                                        <p><strong>education:</strong> {user.education}</p>
                                        <p><strong>employement:</strong> {user.employement}</p>
                                        <p><strong>voter ID:</strong> {user.voter_id}</p>
                                        <p><strong>booth no:</strong> {user.booth_no}</p>
                                        <p><strong>prev voting date:</strong> {user.pre_voting_date}</p>
                                        <p><strong>prev vote to:</strong> {user.pre_vote_to}</p>
                                        <p><strong>membership: </strong>{user.membership}</p>
                                        <p><strong>affiliation:</strong> {user.affiliation}</p>
                                        <p><strong>influence factor:</strong> {user.influence_factor}</p>
                                        {/* Include other user details */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

