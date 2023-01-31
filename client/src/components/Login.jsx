import axios from 'axios';
import React from 'react';

const Login = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
        data
      );

      document.cookie = `token = ${res.data.token}`;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form action='' onSubmit={onSubmit}>
        <input type='text' name='email' />
        <input type='password' name='password' />
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Login;
