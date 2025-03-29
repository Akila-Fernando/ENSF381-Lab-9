import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const backendEndpoint = 'http://127.0.0.1:5000/validate_login';

        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"username": username, "password": password }), // Sends the user input
            });

            const data = await response.json(); // Convert response to JSON

            if (data.success) {
                setMessage(data.message);
                navigate('/predict'); // Redirect to house price predictor page
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Something went wrong. Please try again.');
        }
    }

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
      <div style={{display: 'flex', flexDirection: 'column', boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '10px', border: '1px solid lightgrey', padding: '1rem', maxWidth: '400px'}}>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <label style={{marginBottom:'1rem', fontWeight: 'bold'}}>Username:</label>
        <input style={{padding: '0.5rem', marginBottom: '1rem', width: '95%', height: '30px', borderRadius: '5px', border: '1px solid lightgrey'}}
          name='username'
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label style={{marginBottom: '1rem', fontWeight: 'bold'}}>Password:</label>
        <input style={{padding: '0.5rem', marginBottom: '1rem', width: '95%', height: '30px', borderRadius: '5px', border: '1px solid lightgrey'}}
          name='password'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required />
      <br />
      <div>
      <button type="submit" style={{backgroundColor: '#007BFF', color: 'white', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer', fontSize: '16px', borderRadius: '5px', marginTop: '20px', width: '100%', height: '45px'}}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
      >Login</button>
      </div>
    </form>
    <p style={{color: 'red'}}>{message}</p>
  </div></div>
  )
}

export default Login