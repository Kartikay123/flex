import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link ,useNavigate} from "react-router-dom"
import Display from "./display";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false);
    const [userDetails, setUserDetails] = useState(null); 
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }
        const user = {
            email: email,
            password: password,
        };
       // console.log(user);
        try {
        
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("after login: ", responseData.user);
                alert("Login Successful");
                localStorage.setItem("token",responseData.token);
                setUserDetails(responseData.user);

                  navigate('/display', {
            state: { response: responseData.user }
        });
            }
            else {
                alert("Invalid Credientials");
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Login</Button>

            </form>
            <small>Need an account? <Link to="/">Register here</Link></small>
            {userDetails && <Display user={userDetails}  />}
        </React.Fragment>
    );
}

export default Login;