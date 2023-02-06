import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getDataCookies } from '../utils/getDataCookies';

const Dashboard = () => {
  const token = getDataCookies('token');

  if (token === '') {
    return <Navigate to='/login' />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
