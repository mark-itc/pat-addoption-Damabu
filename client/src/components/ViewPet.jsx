import axios from 'axios';
import localforage from 'localforage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { setState } from '../store/slice/states/state.slice';
import { getDataCookies } from '../utils/getDataCookies';
import BasicModal from './BasicModal';

const ViewPet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = getDataCookies('token');
  const [data, setData] = useState({});
  const [role, setRole] = useState('');
  const [handleModal, setHandleModal] = useState(true);

  useEffect(() => {
    localforage.getItem('user').then((res) => {
      setRole(res.user.rol);
    });
  }, []);

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
      <BasicModal isActive={handleModal} data={data} id={id} change={setData} />
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
          <p>Hypoallergenic : {data?.pet?.hypoallergenic ? 'Yes' : 'No'}</p>
          <p>Dietary Restrictions : {data?.pet?.dietaryRestrictions}</p>
          <p>Breed : {data?.pet?.breed}</p>
        </ContInfoDetails>
      </ContInfoPet>
      {role === 'admin' && (
        <button
          onClick={() =>
            dispatch(setState({ option: 'isOpenModal', value: true }))
          }
        >
          Editar
        </button>
      )}
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
  gap: 15px;
  padding: 10px;

  & > button {
    width: 300px;
    font-size: 1.2em;
    padding: 10px;
    border-radius: 10px;
    background-color: #f5a336;
    color: #fff;
    border: none;
    font-weight: 500;
    cursor: pointer;
  }
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
