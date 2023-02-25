import { Button } from '@mui/material';
import axios from 'axios';
import localforage from 'localforage';
import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from '../animations/Loading';
import Sucess from '../animations/Sucess';
import BasicSelect from '../stylesGlobals/BasicSelect';
import { InputTextField } from '../stylesGlobals/Inputs';

const AddPet = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoaded(true);

    const { token } = await localforage.getItem('user');

    const formData = new FormData(e.target);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/pets/pet`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoaded(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {}
  };

  return (
    <ContainerAddPet>
      {success ? (
        <ContaintSuccess>
          <Sucess />
          <h1>Pet successfully Added</h1>
        </ContaintSuccess>
      ) : (
        <>
          <h1>Add Pet</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <InputTextField label='Type' inputProps={{ name: 'type' }} />
              <InputTextField label='Name' inputProps={{ name: 'name' }} />
            </div>
            <div>
              <BasicSelect
                textLabel={'Adoption Status'}
                name={'adoptionStatus'}
                options={[
                  { value: 'Adopted', option: 'Adopted' },
                  { value: 'Fostered', option: 'Fostered' },
                  { value: 'Available', option: 'Available' },
                ]}
              />
              <InputTextField
                label='Picture'
                type={'file'}
                inputProps={{ name: 'imgPet' }}
              />
            </div>
            <div>
              <InputTextField label='Height' inputProps={{ name: 'height' }} />
              <InputTextField label='Weight' inputProps={{ name: 'weight' }} />
            </div>
            <div>
              <InputTextField label='Color' inputProps={{ name: 'color' }} />
              <InputTextField label='Bio' inputProps={{ name: 'bio' }} />
            </div>
            <div>
              <BasicSelect
                textLabel={'Hypoallergenic'}
                name={'hypoallergenic'}
                options={[
                  { value: '1', option: 'Yes' },
                  { value: '0', option: 'No' },
                ]}
              />
            </div>
            <div>
              <InputTextField
                label='Dietary Restrictions'
                inputProps={{ name: 'dietaryRestrictions' }}
              />
              <InputTextField label='Breed' inputProps={{ name: 'breed' }} />
            </div>
            <Button variant='contained' type='submit'>
              {isLoaded ? <Loading /> : 'Add pet'}
            </Button>
          </form>
        </>
      )}
    </ContainerAddPet>
  );
};

export default AddPet;

const ContainerAddPet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
      display: flex;
      gap: 20px;
    }
    button {
      height: 45px;
    }
  }
`;

const ContaintSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: -50px;
  }
`;
