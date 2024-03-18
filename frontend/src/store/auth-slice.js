import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isKidsMode: false,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, actions) {
      state.isAuth = true;
      state.userInfo = actions.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.userInfo = {};
    },
    activateKidsMode(state) {
      state.isKidsMode = true;
    },
    deactivateKidsMode(state) {
      state.isKidsMode = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
