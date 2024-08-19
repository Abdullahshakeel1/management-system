import axios from "axios";
import React, { useState } from "react";

const AddUser = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
      
        cnic: "",
        rollNumber: "",
        pashaFees: "unpaid",
        candidateType: "learner",
        feeValue: "0"
    });

    const isValidData = () => {
        return data.name && data.email && data.mobile  && data.cnic && data.rollNumber && (data.pashaFees === "unpaid" || data.feeValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidData()) {
            alert('Please fill all the fields correctly.');
            return;
        }

        console.log('Data being sent:', data);

        try {
            const res = await axios.post('http://localhost:7600/person', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', res.data);
            alert('Person added successfully');
            setData({
                name: "",
                email: "",
                mobile: "",
              
                cnic: "",
                rollNumber: "",
                pashaFees: "unpaid",
                candidateType: "learner",
                feeValue: ""
            });
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            alert('There was an error adding the person.');
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-user-form mt-10 " >
            <form onSubmit={handleSubmit} className="font-[sans-serif] text-[#ffffff]">
                <div className="grid sm:grid-cols-2 gap-10">
                    <div className="relative flex items-center">
                        <label className="text-[13px] absolute top-[-10px] left-0">Name</label>
                        <input
                            onChange={handleChange}
                            value={data.name}
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        />
                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] absolute top-[-10px] left-0">Email</label>
                        <input
                            onChange={handleChange}
                            value={data.email}
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        />
                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] absolute top-[-10px] left-0">Mobile No</label>
                        <input
                            onChange={handleChange}
                            value={data.mobile}
                            name="mobile"
                            type="text"
                            placeholder="Enter phone number"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        />
                    </div>

                   

                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] absolute top-[-10px] left-0">CNIC</label>
                        <input
                            onChange={handleChange}
                            value={data.cnic}
                            name="cnic"
                            type="text"
                            placeholder="Enter CNIC"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        />
                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] absolute top-[-10px] left-0">Roll Number</label>
                        <input
                            onChange={handleChange}
                            value={data.rollNumber}
                            name="rollNumber"
                            type="text"
                            placeholder="Enter roll number"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        />
                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] absolute top-[-10px] left-0">Pasha Fees</label>
                        <select
                            onChange={handleChange}
                            value={data.pashaFees}
                            name="pashaFees"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        >
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>

                    {data.pashaFees === "paid" && (
                        <div className="relative flex items-center">
                            <label className="text-[13px] absolute top-[-10px] left-0">Fee Value</label>
                            <input
                                onChange={handleChange}
                                value={data.feeValue}
                                name="feeValue"
                                type="text"
                                placeholder="Enter fee value"
                                className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                            />
                        </div>
                    )}

                    <div className="relative flex items-center">
                        <label className="text-[13px] absolute top-[-10px] left-0">Candidate Type</label>
                        <select
                            onChange={handleChange}
                            value={data.candidateType}
                            name="candidateType"
                            className="px-2 pt-5 pb-2 bg-[#7f5aa4] w-full text-sm border-b-2 border-gray-100 focus:border-[#5fd594] outline-none"
                        >
                            <option value="learner">Learner</option>
                            <option value="intern">Intern</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-10 px-2 py-2.5 w-full rounded-sm text-sm bg-[#ffffff] hover:bg-red-400 hover:text-white text-[#7f5aa4]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUser;