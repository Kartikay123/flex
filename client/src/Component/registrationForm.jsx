import React, { useState } from 'react';
import { TextField, Button, Stack, MenuItem } from '@mui/material';
import { Link,useNavigate } from "react-router-dom"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Importing the tick sign icon


const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfJoining, setDateOfJoining] = useState('')
    const [selectedBatch, setSelectedBatch] = useState('');
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('');
    const [paymentDone, setPaymentDone] = useState(false);
    const navigate= useNavigate();

    const handleBatchChange = (event) => {
        setSelectedBatch(event.target.value);
    };
    const handlePayment = () => {
        setPaymentDone((prevPaymentDone) => !prevPaymentDone);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfJoining: dateOfJoining,
            password: password,
            age: age,
            selectedBatch:selectedBatch,
            paymentDone: paymentDone
        };
        console.log(user);
        try {
            const response = await fetch("https://serverbackend-mfgv.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("response data : ", response);

            if (response.ok) {
                const responseData = await response.json();
                alert("registration successful");
                setFirstName("");
                setLastName("");
                setEmail("");
                setDateOfJoining("");
                setPassword("");
                setAge("");
                setPaymentDone(false);
                setSelectedBatch("");
                navigate('/login');

                console.log(responseData);
            } else {
                alert("email already exists");
                //alert("registration successful");
                setFirstName("");
                setLastName("");
                setEmail("");
                setDateOfJoining("");
                setPassword("");
                setAge("");
                setPaymentDone(false);
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    return (
        <React.Fragment>
            <h2>Yoga Registration Form</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="number"
                        variant="outlined"
                        color="secondary"
                        label="Age"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        fullWidth
                        required
                        InputProps={{
                            inputProps: {
                                min: 18,
                                max: 65,
                            },
                        }}
                    />
                </Stack>
                <TextField
                    select
                    label="Select Batch"
                    value={selectedBatch}
                    onChange={handleBatchChange}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                >
                    <MenuItem value="">Select Batch</MenuItem>
                    <MenuItem value="6-7AM">6-7AM</MenuItem>
                    <MenuItem value="7-8AM">7-8AM</MenuItem>
                    <MenuItem value="8-9AM">8-9AM</MenuItem>
                    <MenuItem value="5-6PM">5-6PM</MenuItem>
                </TextField>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    // label="Date of Joining"
                    onChange={e => setDateOfJoining(e.target.value)}
                    value={dateOfJoining}
                    fullWidth
                    required
                    sx={{
                        mb: 4,
                        borderRadius: '8px'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="button"
                        onClick={handlePayment}
                        sx={{ mb: 4 }}
                    >
                        Payment - $500
                        {paymentDone && <CheckCircleIcon sx={{ ml: 1 }} />}
                    </Button>
                    <Button variant="outlined" color="secondary" type="submit" sx={{ mb: 4 }}>Register</Button>
                </div>
            </form>
            <small>Already have an account? <Link to="/login">Login Here</Link></small>

        </React.Fragment>
    )
}

export default RegisterForm;