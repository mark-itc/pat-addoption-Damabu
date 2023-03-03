import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setState } from '../store/slice/states/state.slice';
import styled from 'styled-components';
import { InputTextField } from '../stylesGlobals/Inputs';
import BasicSelect from '../stylesGlobals/BasicSelect';
import localforage from 'localforage';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ isActive, data, id, change }) {
  const dispatch = useDispatch();
  const { isOpenModal } = useSelector((state) => state.state);
  const closeModal = () =>
    dispatch(setState({ option: 'isOpenModal', value: false }));

  React.useEffect(() => {
    console.log(isOpenModal);
  }, [isOpenModal]);

  const handleClose = () => closeModal;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //setIsLoaded(true);

    const { token } = await localforage.getItem('user');

    const formData = new FormData(e.target);

    console.log(formData.get('type'));

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/pets/updatepet/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setState({ option: 'isOpenModal', value: false }));

      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/pets/getpetbyid/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          change(res.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  console.log(data.pet?.hypoallergenic);

  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={() =>
          dispatch(setState({ option: 'isOpenModal', value: false }))
        }
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputTextField
                label='Type'
                inputProps={{ name: 'type' }}
                defaultValue={data.pet?.type}
              />
              <InputTextField
                label='Name'
                inputProps={{ name: 'name' }}
                defaultValue={data.pet?.name}
              />
            </div>
            <div>
              <BasicSelect
                textLabel={'Adoption Status'}
                name={'adoptionStatus'}
                defaultValue={data.pet?.adoptionStatus}
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
              <InputTextField
                label='Height'
                inputProps={{ name: 'height' }}
                defaultValue={data.pet?.height}
              />
              <InputTextField
                label='Weight'
                inputProps={{ name: 'weight' }}
                defaultValue={data.pet?.weight}
              />
            </div>
            <div>
              <InputTextField
                label='Color'
                inputProps={{ name: 'color' }}
                defaultValue={data.pet?.color}
              />
              <InputTextField
                label='Bio'
                inputProps={{ name: 'bio' }}
                defaultValue={data.pet?.bio}
              />
            </div>
            <div>
              <BasicSelect
                textLabel={'Hypoallergenic'}
                name={'hypoallergenic'}
                defaultValue={data.pet?.hypoallergenic ? '1' : '0'}
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
                defaultValue={data.pet?.dietaryRestrictions}
              />
              <InputTextField
                label='Breed'
                inputProps={{ name: 'breed' }}
                defaultValue={data.pet?.breed}
              />
            </div>
            <Button variant='contained' type='submit'>
              {'Save'}
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}

const Form = styled.form`
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
`;
