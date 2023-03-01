import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDataCookies } from '../utils/getDataCookies';

const Dashboard = () => {
  const token = getDataCookies('token');
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const pet = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: `${process.env.REACT_APP_API_URL}/api/v1/pets/getallpets`,
      });
      setData(res.data);
    } catch (error) {
      if (error.response.data.error.message === 'jwt expired') {
        localStorage.removeItem('token');
      }
    }
  };

  useEffect(() => {
    pet();
  }, []);

  const viewPet = (id) => {
    navigate(`/dashboard/viewpet/${id}`);
    console.log(id);
  };

  console.log(data);

  /*if (token === '') {
    return <Navigate to='/login' />;
  }*/

  return (
    <MainContaintPets>
      {data.pets?.map((pet) => {
        return (
          <CardPet key={pet._id} onClick={() => viewPet(pet._id)}>
            <img src={pet.picture} alt='' />
            <p>Type : {pet.type}</p>
            <p>Name : {pet.name}</p>
            <p>Adoption Status : {pet.adoptionStatus}</p>
          </CardPet>
        );
      })}
    </MainContaintPets>
  );
};

export default Dashboard;

const MainContaintPets = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow: auto;
  justify-content: center;
`;

const CardPet = styled.div`
  img {
    border-radius: 5px;
    width: 100%;
    height: 150px;
    margin-bottom: 15px;
  }

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  width: 250px;

  padding: 10px;
  display: flex;
  flex-direction: column;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
