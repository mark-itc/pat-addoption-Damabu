import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loading from '../animations/Loading';
import {
  Form,
  MainContForm,
  MainContInput,
  MainContMsgError,
} from '../stylesGlobals/StyleGlobals';

const Login = () => {
  const [error, setError] = useState({ state: false, message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
        data
      );
      setLoading(false);
      navigate('/dashboard');
      document.cookie = `token = ${res.data.token}; max-age = 10`;
    } catch (error) {
      setLoading(false);
      setError({ state: true, message: error.response.data.msg });
      console.log(error.response.data);
    }
  };

  return (
    <MainContForm>
      <Form action='' onSubmit={onSubmit}>
        {error.state && (
          <MainContMsgError>
            <p>{error.message}</p>
          </MainContMsgError>
        )}
        <h1>Login</h1>
        <MainContInput>
          <label htmlFor=''>Email</label>
          <input type='text' name='email' />
        </MainContInput>
        <MainContInput>
          <label htmlFor=''>Password</label>
          <input type='password' name='password' />
        </MainContInput>

        <button>{loading ? <Loading /> : 'Login'}</button>
        <NavLink to='/signup'>
          <button type='button' style={{ backgroundColor: 'black' }}>
            {'Sign Up'}
          </button>
        </NavLink>
      </Form>
    </MainContForm>
  );
};

export default Login;
