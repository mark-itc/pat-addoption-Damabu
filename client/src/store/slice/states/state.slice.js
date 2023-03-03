import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const stateSlice = createSlice({
  name: 'states',
  initialState: {
    isOpenModal: false,
    isLoading: false,
  },
  reducers: {
    setState: (state, action) => {
      const option = action.payload.option;
      state[option] = action.payload.value;
      return state;
    },
  },
});

export const { setState } = stateSlice.actions;

export default stateSlice.reducer;
