import axios from 'axios';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDataCookies } from '../utils/getDataCookies';

const PetAdopted = () => {
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [pet, setPet] = useState([]);
  const token = getDataCookies('token');

  useEffect(() => {
    localforage.getItem('user').then((res) => {
      setUser(res);
    });
  }, []);

  useEffect(() => {
    if (user.user?._id) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/v1/pets/pet/user/${user.user?._id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setPet(res.data);
        });
    }
  }, [user, refresh]);

  const returnPet = async (id) => {
    const res = await axios({
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_API_URL}/api/v1/pets/pet/${id}/return`,
    });

    setRefresh(!refresh);
  };

  return (
    <MainContaintPets>
      {pet.adoptedPets?.map((pet) => {
        return (
          <CardPet key={pet._id}>
            <img src={pet.picture} alt='' />
            <p>Type : {pet.type}</p>
            <p>Name : {pet.name}</p>
            <p>Adoption Status : {pet.adoptionStatus}</p>
            <button onClick={() => returnPet(pet._id)}>Return</button>
          </CardPet>
        );
      })}
    </MainContaintPets>
  );
};

export default PetAdopted;

const MainContaintPets = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow: auto;
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
  height: 270px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
