import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SignUp = () => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      data.phoneNumber = parseInt(data.phoneNumber);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/signup`,
        data
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor=''>First Name</label>
        <input {...register('firstName', { required: true })} type='text' />
      </div>
      <div>
        <label htmlFor=''>Last Name</label>
        <input {...register('lastName')} type='text' />
      </div>
      <div>
        <label htmlFor=''>Email</label>
        <input {...register('email')} type='email' />
      </div>
      <div>
        <label htmlFor=''>Password</label>
        <input {...register('password')} type='password' />
      </div>
      <div>
        <label htmlFor=''>Repeat Password</label>
        <input {...register('repeatPassword')} type='password' />
      </div>
      <div>
        <label htmlFor=''>Phone Number</label>
        <input {...register('phoneNumber')} type='number' />
      </div>
      <button>Register</button>
    </Form>
  );
};

export default SignUp;

const Form = styled.form``;
