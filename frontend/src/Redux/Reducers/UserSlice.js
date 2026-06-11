import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [{
        name : "basha",
        email : "bashashaik8066@gmail.com",
        phone : 908976544678,
    },
    {
        name : "aaaa",
        email : "bashashaik8066@gmail.com",
        phone : 345678685465,
    },
    {
        name : "bol",
        email : "bashashaik8066@gmail.com",
        phone : 345678685465,
    },
    {
        name : "cat",
        email : "bashashaik8066@gmail.com",
        phone : 345678685465,
    },
    {
        name : "das",
        email : "bashashaik8066@gmail.com",
        phone : 345678685465,
    },
    {
        name : "elo",
        email : "bashashaik8066@gmail.com",
        phone : 345678685465,
    },
    ],
  },
  reducers: {
    setData: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setData, deleteUser } = userSlice.actions;
export default userSlice.reducer;