import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ManagementPerson = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:7600/management/getAllManagement',{
            withCredentials: true 
        })
            .then(response => {
                console.log('API Response:', response.data);
                setUsers(response.data || []); // Ensure users is always an array
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching users.');
                setLoading(false);
            });
    }, []);
    
    const handleDelete = (id) => {
        if (!id) {
            console.error('ID is undefined!');
            return;
        }
        axios.delete(`http://localhost:7600/management/deleteManagement/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(error => {
                setError('Error deleting the user.');
            });
    }

    const handleEdit = (id) => {
        setEditId(id);
    }

    const handleSave = (id) => {
        setIsSaving(true);
        const updatedUser = users.find(user => user._id === id);
        const name = document.getElementById(`name-${id}`).innerText;
        const email = document.getElementById(`email-${id}`).innerText;
        const mobile = document.getElementById(`mobile-${id}`).innerText;
        const role = document.getElementById(`role-${id}`).innerText;
        const userUpdates = { _id: id, name, email, mobile, role };

        axios.put(`http://localhost:7600/management/updateManagement/${id}`, userUpdates)
            .then(response => {
                setUsers(users.map(user => user._id === id ? response.data.person : user));
                setEditId(null);
                setIsSaving(false);
            })
            .catch(error => {
                setError('Error updating the user.');
                setIsSaving(false);
            });
    }

    const filterData = users.filter(user => {
        // Check if user is defined and has the 'name' property
        return user && user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="user-list mt-10 mx-auto px-6">
            <h1 className="title text-center text-2xl pb-8 font-bold text-[#7f5aa4]">User List</h1>
            <div className='flex align-middle justify-around'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='text-[#7f5aa4] border border-spacing-12 border-[#7f5aa4] bg-white px-16 py-2'
                    placeholder='Search by name'
                />
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button bg-slate-100 text-[#7f5aa4] px-4 border-[#7f5aa4] border-spacing-10"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                />
            </div>
            <table id="table-to-xls" className="table-auto w-full mt-4 border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Name</th>
                        <th className="border border-gray-200 px-4 py-2">Email</th>
                        <th className="border border-gray-200 px-4 py-2">Phone</th>
                        <th className="border border-gray-200 px-4 py-2">Role</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map(user => (
                        <tr key={user._id} className="bg-white">
                            <td
                                id={`name-${user._id}`}
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.name}
                            </td>
                            <td
                                id={`email-${user._id}`}
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.email}
                            </td>
                            <td
                                id={`mobile-${user._id}`}
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.mobile}
                            </td>
                            <td
                                id={`role-${user._id}`}
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.role}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <div className="user-actions flex gap-2">
                                    {editId === user._id ? (
                                        <>
                                            <button
                                                className={`bg-[#7f5aa4] text-white px-4 py-2 rounded hover:bg-black ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => handleSave(user._id)}
                                                disabled={isSaving}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                                onClick={() => setEditId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="bg-[#7f5aa4] text-white px-4 py-2 rounded hover:bg-black"
                                            onClick={() => handleEdit(user._id)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="bg-[#e74c3c] text-white px-4 py-2 rounded hover:bg-[#000]"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementPerson;
