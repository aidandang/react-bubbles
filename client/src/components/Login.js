import React, { useState } from 'react';
import { axiosWithAuth } from './axiosAuth';

const Login = (props) => {
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const login = e => {
    e.preventDefault();
    setIsFetching(true);
    axiosWithAuth().post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/');
      })
      .catch(err => {
        console.log(err)
        setIsFetching(false);
        setError(err.message);
      })
  }

  const handleChange = e => {
    e.persist();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  return <>

    <form onSubmit={login}>

      <div className="row">
        <div className="col-6">
          {isFetching === true && '...Loading'}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          {isFetching === true && <small>...Loading</small>}
          {error === 'Request failed with status code 403' && <small className="text-danger">Login and password are invalid</small>}
        </div>
      </div>
      
      <div className="row">
        <div className="col-6">
          <button type="submit" className="btn btn-primary mt-4">Log in</button>
        </div>
      </div>

    </form>

  </>
}

export default Login;
