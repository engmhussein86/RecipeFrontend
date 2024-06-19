import { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Register(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:4000/users/register',{username,email,password})
            .then((response) => {
                if(response.status ===201){
                    setSuccess("successfully created username : "+response.data.username+ " , You can login now ");
                    // navigateTo('/Login');
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
    }

    return(
        <div className="container mt-5">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} >
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <Alert key='success' variant='success'><div>{success}<Link className="nav-link" to="/Login"  >Login </Link></div></Alert>}
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
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
    
}