import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceModalIsOpen: false,
  kidsmodeModalIsOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    deviceModalOpen(state) {
      state.deviceModalIsOpen = true;
    },
    deviceModalClose(state) {
      state.deviceModalIsOpen = false;
    },
    kidsmodeModalOpen(state) {
      state.kidsmodeModalIsOpen = true;
    },
    kidsmodeModalClose(state) {
      state.kidsmodeModalIsOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
