import React, { useState, useEffect } from "react";
import './display.css';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation, useNavigate } from "react-router-dom";

const Display = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const responseData = location.state?.response;
    const {
        firstName,
        lastName,
        email,
        dateOfJoining,
        age,
        selectedBatch,
        paymentDone,
    } = responseData;
    const [newSelectedBatch, setNewSelectedBatch] = useState('');
    const batchOptions = ['6-7AM', '7-8AM', '8-9AM', '5-6PM'];
    const [selectedBatchDisplay, setSelectedBatchDisplay] = useState(selectedBatch || '');
    const [isPaymentDone, setIsPaymentDone] = useState(paymentDone);
    const [isEligibleForBatchChange, setIsEligibleForBatchChange] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    useEffect(() => {
        // Calculate the current date
        const currentDate = new Date();
        // Convert the date of joining string to a Date object
        const joinDate = new Date(dateOfJoining);

        // Calculate the difference in milliseconds
        const differenceInTime = currentDate - joinDate;
        // Calculate the difference in days
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // Check if the difference is greater than or equal to 30 days
        if (differenceInDays >= 30) {
            setIsEligibleForBatchChange(true);
        }
    }, [dateOfJoining]);



    const handlePayment = async () => {
        if (!isPaymentDone) {
            try {
                // Assuming you have an endpoint like /api/users/:userId/payment
                const userId = responseData._id; // Replace with the correct user ID
                //console.log(userId);
                const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
                    method: "PUT", // or PUT depending on your backend setup
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ paymentDone: true }), // Update paymentDone to true
                });

                if (response.ok) {
                    setIsPaymentDone(true);
                    // Update responseData in the frontend if needed
                    responseData.paymentDone = true; // Optional, if you want to update frontend data immediately
                } else {
                    console.error("Failed to update payment status");
                }
            } catch (error) {
                console.error("Error updating payment:", error);
            }
        }
    };
    const handleBatchSelection = async () => {
        // Call the backend to allow batch change for the user
        try {
            const userId = responseData._id; // Replace with the correct user ID
            const response = await fetch(`http://localhost:5000/api/auth/users/${userId}/allow-batch-change`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ selectedBatch: newSelectedBatch }),
            });

            if (response.ok) {

                console.log("User allowed for batch change");
                setSelectedBatchDisplay(newSelectedBatch);
            } else {
                console.error("Failed to update batch change permission");
            }
        } catch (error) {
            console.error("Error updating batch change permission:", error);
        }
    };

    return (
        <div>
            {responseData ? (
                <div className="user-details">
                    <h2>Welcome, {firstName} {lastName}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>First Name:</strong></td>
                                <td>{firstName}</td>
                            </tr>
                            <tr>
                                <td><strong>Last Name:</strong></td>
                                <td>{lastName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td><strong>Date of Joining:</strong></td>
                                <td>{dateOfJoining}</td>
                            </tr>
                            <tr>
                                <td><strong>Age:</strong></td>
                                <td>{age}</td>
                            </tr>
                            <tr>
                            <td><strong>Selected Batch:</strong></td>
                            <td>{selectedBatchDisplay}</td>
                        </tr>

                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="button"
                            onClick={handlePayment}
                            sx={{ mb: 4 }}
                        >
                            Payment - $500
                            {isPaymentDone && <CheckCircleIcon sx={{ ml: 1 }} />}
                        </Button>
                        <Button variant="outlined" color="secondary" type="button" onClick={handleLogout} sx={{ mb: 4 }}>Logout</Button>
                    </div>
                    <div className={isEligibleForBatchChange ? 'batch-selection-container' : 'hidden'}>
                        <p>Select New Batch:</p>
                        <select value={newSelectedBatch} onChange={(e) => setNewSelectedBatch(e.target.value)}>
                            <option value="">Select Batch</option>
                            {batchOptions.map((batch, index) => (
                                <option key={index} value={batch}>{batch}</option>
                            ))}
                        </select>
                        <Button
                            className="save-button"
                            variant="outlined"
                            color="secondary"
                            type="button"
                            onClick={handleBatchSelection}
                        >
                            Save Selected Batch
                        </Button>
                    </div>
                </div>
            ) : (
                <div>No user data available</div>
            )}
        </div>
    );
};

export default Display;



