import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    membership: {},
    persentaseHarga: 0,
    transaksi: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
    setPersentaseHarga: (state, action) => {
      state.persentaseHarga = action.payload;
    },
    setTransaksi: (state, action) => {
      state.transaksi = action.payload;
    },
  },
});

export const { setProfile, setMembership, setTransaksi, setPersentaseHarga } =
  profileSlice.actions;

export default profileSlice.reducer;
