import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:7600/person')
            .then(response => {
                console.log('API Response:', response.data);
                setUsers(response.data.persons);
                setLoading(false);
            })
            .catch(error => {
                setError('There was an error fetching the users.');
                setLoading(false);
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleDelete = (id) => {
        if (!id) {
            console.error('ID is undefined!');
            return;
        }
        axios.delete(`http://localhost:7600/person/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(error => {
                setError('There was an error deleting the user.');
                console.error('There was an error deleting the user!', error);
            });
    }

    const handleEdit = (id) => {
        console.log('Edit user with ID:', id);
        setEditId(id);
    }

    const handleSave = (id) => {
        const editedUser = users.find(user => user._id === id);
        const name = document.getElementById(`name-${id}`).innerText;
        const email = document.getElementById(`email-${id}`).innerText;
        const mobile = document.getElementById(`mobile-${id}`).innerText;
        const cnic = document.getElementById(`cnic-${id}`).innerText;
        const rollNumber = document.getElementById(`rollNumber-${id}`).innerText;
        const pashaFees = document.getElementById(`pashaFees-${id}`).innerText;
        const candidateType = document.getElementById(`candidateType-${id}`).innerText;
        const feeValue = document.getElementById(`feeValue-${id}`).innerText;
        const updatedUser = { _id: id, name, email, mobile, cnic, rollNumber, pashaFees, candidateType, feeValue };

        axios.put(`http://localhost:7600/person/${id}`, updatedUser)
            .then(response => {
                console.log('API Response:', response.data);
                setUsers(users.map(user => user._id === id ? response.data.person : user));
                setEditId(null);
            })
            .catch(error => {
                setError('There was an error updating the user.');
                console.error('There was an error updating the user!', error);
            });
    }

    const filterData = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="user-list mt-10 mx-auto px-6">
            <h1 className="title text-center text-2xl pb-8 font-bold text-[#7f5aa4]">Persons List</h1>
         <div className='flex align-middle justify-around'>
         <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className='text-[#7f5aa4] border-none bg-white px-16 py-2 rounded-md' 
                placeholder='Search by name'
            />
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button bg-green-400 text-[#ffffff] px-4 border-[#7f5aa4] border-spacing-10 rounded-md"
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
                        <th className="border border-gray-200 px-4 py-2">cnic</th>
                        <th className="border border-gray-200 px-4 py-2">rollNumber</th>
                        <th className="border border-gray-200 px-4 py-2">pashaFees</th>
                        <th className="border border-gray-200 px-4 py-2">candidateType</th>
                        <th className="border border-gray-200 px-4 py-2">feeValue</th>

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
                                id={`cnic-${user._id}`} 
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.cnic}
                            </td>
                            <td 
                                id={`rollNumber-${user._id}`} 
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.rollNumber}
                            </td>
                            <td 
                                id={`pashaFees-${user._id}`} 
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.pashaFees}
                            </td>
                            <td 
                                id={`candidateType-${user._id}`} 
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.candidateType}
                            </td>
                            <td 
                                id={`feeValue-${user._id}`} 
                                className="border border-gray-200 px-4 py-2"
                                contentEditable={editId === user._id}
                            >
                                {user.feeValue}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <div className="user-actions flex gap-2">
                                    {editId === user._id ? (
                                        <button 
                                            className="bg-[#7f5aa4] text-white px-4 py-2 rounded hover:bg-black"
                                            onClick={() => handleSave(user._id)}
                                        >
                                            Save
                                        </button>
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

export default UserList;
