import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
