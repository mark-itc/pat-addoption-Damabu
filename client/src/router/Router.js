import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPet from '../components/AddPet';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import Login from '../components/Login';
import Nav from '../components/Nav';
import SignUp from '../components/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<Nav />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addpet' element={<AddPet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
