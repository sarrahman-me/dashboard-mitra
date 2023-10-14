import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    membership: {},
    transaksi: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
    setTransaksi: (state, action) => {
      state.transaksi = action.payload;
    },
  },
});

export const { setProfile, setMembership, setTransaksi } = profileSlice.actions;

export default profileSlice.reducer;
