import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDataCookies } from '../utils/getDataCookies';

const ViewPet = () => {
  const { id } = useParams();

  const token = getDataCookies('token');
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/pets/getpetbyid/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <ContaintViewPet>
      <ContInfoPet>
        <div>
          <img src={data.pet?.picture} alt='' />
        </div>
        <ContInfoDetails>
          <p>Name : {data.pet?.name}</p>
          <p>Type : {data?.pet?.type}</p>
          <p>Adoption Status : {data?.pet?.adoptionStatus}</p>
          <p>Height : {data?.pet?.height}</p>
          <p>Weight : {data?.pet?.weight}</p>
          <p>Color : {data?.pet?.color}</p>
          <p>Bio : {data?.pet?.bio}</p>
          <p>Hypoallergenic : {data?.pet?.hypoallergenic ? 'Si' : 'No'}</p>
          <p>Dietary Restrictions : {data?.pet?.dietaryRestrictions}</p>
          <p>Breed : {data?.pet?.breed}</p>
        </ContInfoDetails>
      </ContInfoPet>
    </ContaintViewPet>
  );
};

export default ViewPet;

const ContaintViewPet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const ContInfoPet = styled.div`
  width: 300px;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  & > div {
    display: flex;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
    margin-bottom: 15px;
  }
`;

const ContInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
