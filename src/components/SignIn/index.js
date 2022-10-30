import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import {  Button, TextField } from '@aws-amplify/ui-react'

export default function Signin({onSignin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const signIn = async () => {
        try {
            const user = await Auth.signIn(username, password);
            navigate('/');
            onSignin();
            navigate(0);
        } catch (error) {
            console.log('error signing in', error);
        }
    };

    return (
        <div className="login">
            <TextField
                id="username"
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button id="signinButton" color="primary" onClick={signIn}>
                Sign In
            </Button>
        </div>
    );
};