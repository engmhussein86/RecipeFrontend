import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../../utils/getBaseUrl';

export default function Login(){
  const baseURL = getBaseUrl();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${baseURL}/users/login`, { username, password })
          .then((response) => {
            console.log(response);
            if(response.status ===200){
                setSuccess(response.data.msg);
                localStorage.setItem('token', response.data.token);
                navigateTo('/')
            }

          })
        .catch(function (error) {
            if (error.response) {                    
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              setError(error.response.data.msg);
            }});            
         
    }
    catch(error){
        setError(error.message);
    }
};

    return(
        <div className="container mt-5">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <Alert key='success' variant='success'>{success}</Alert>}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
}