import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import BasicSelect from '../stylesGlobals/BasicSelect';
import { InputTextField } from '../stylesGlobals/Inputs';

const AddPet = () => {
  return (
    <ContainerAddPet>
      <h1>Add Pet</h1>
      <form action=''>
        <div>
          <InputTextField label='Type' />
          <InputTextField label='Name' />
        </div>
        <div>
          <BasicSelect
            textLabel={'Adoption Status'}
            options={[
              { value: 'Adopted', option: 'Adopted' },
              { value: 'Fostered', option: 'Fostered' },
              { value: 'Available', option: 'Available' },
            ]}
          />
          <InputTextField label='Picture' type={'file'} />
        </div>
        <div>
          <InputTextField label='Height' />
          <InputTextField label='Weight' />
        </div>
        <div>
          <InputTextField label='Color' />
          <InputTextField label='Bio' />
        </div>
        <div>
          <BasicSelect
            textLabel={'Hypoallergenic'}
            options={[
              { value: '1', option: 'Yes' },
              { value: '0', option: 'No' },
            ]}
          />
          <InputTextField label='Bio' />
        </div>
        <div>
          <InputTextField label='Dietary Restrictions' />
          <InputTextField label='Breed' />
        </div>
        <Button variant='contained'>Add pet</Button>
      </form>
    </ContainerAddPet>
  );
};

export default AddPet;

const ContainerAddPet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  }
`;
