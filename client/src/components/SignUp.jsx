import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Loading from '../animations/Loading';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Form,
  MainContForm,
  MainContInput,
  MainContMsgError,
} from '../stylesGlobals/StyleGlobals';

const SignUp = () => {
  const { handleSubmit, register, reset } = useForm();
  const [error, setError] = useState({ state: false, message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.phoneNumber = parseInt(data.phoneNumber);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/signup`,
        data
      );
      setLoading(false);
      navigate('/login');
      console.log(res.data);
    } catch (error) {
      setError({ state: true, message: error.response.data.msg });
      setLoading(false);
      console.log(error.response.data);
    }
  };

  return (
    <MainContForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error.state && (
          <MainContMsgError>
            <p>{error.message}</p>
          </MainContMsgError>
        )}
        <h1>Sign Up</h1>
        <MainContInput>
          <label htmlFor=''>First Name</label>
          <input {...register('firstName', { required: true })} type='text' />
        </MainContInput>
        <MainContInput>
          <label htmlFor=''>Last Name</label>
          <input {...register('lastName')} type='text' />
        </MainContInput>
        <MainContInput>
          <label htmlFor=''>Email</label>
          <input {...register('email')} type='email' />
        </MainContInput>
        <MainContInput>
          <label htmlFor=''>Password</label>
          <input {...register('password')} type='password' />
        </MainContInput>
        <MainContInput>
          <label htmlFor=''>Repeat Password</label>
          <input {...register('repeatPassword')} type='password' />
        </MainContInput>
        <MainContInput>
          <label htmlFor=''>Phone Number</label>
          <input {...register('phoneNumber')} type='number' />
        </MainContInput>
        <button>{loading ? <Loading /> : 'Register'}</button>
        <NavLink to='/login'>
          <button type='button' style={{ backgroundColor: 'black' }}>
            {'Login'}
          </button>
        </NavLink>
      </Form>
    </MainContForm>
  );
};

export default SignUp;
