import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "webstore",
  initialState: {
    profile: [],
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
