import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editprofile: [],
  editaddress: [],
  photo:[],
};

const CustomerEditProfile = createSlice({
  name: "editprofile",
  initialState,
  reducers: {
    getEditProfile: (state, action) => {
      state.editprofile = action.payload;
      console.log("action :", state.editprofile);
    },
    deleteEditProfile: (state, action) => {
      state.editprofile = state.editprofile.filter(
        (item) => item._id !== action.payload,
      );
    },
    postEditProfile: (state, action) => {
      state.editprofile = [...state.editprofile, action.payload];
      console.log("action :", state.editprofile);
    },
    updateEditProfile: (state, action) => {
      state.editprofile = state.editprofile.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
    },
    geteditaddress: (state, action) => {
      state.editaddress = action.payload;
    },
    deleteeditaddress: (state, action) => {
      state.editaddress = state.editaddress.filter(
        (item) => item._id !== action.payload,
      );
    },
    posteditaddress: (state, action) => {
      state.editaddress = [...state.editaddress, action.payload];
      console.log("action :", state.editaddress);
    },
    updateeditaddress: (state, action) => {
      state.editaddress = state.editaddress.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
    },
    getCustomerPhoto: (state, action) => {
      state.photo = action.payload;
    },
    deleteCustomerPhoto: (state, action) => {
      state.photo = state.photo.filter((item) => item._id !== action.payload);
    },
    postCustomerPhoto: (state, action) => {
      state.photo = [...state.photo, action.payload];
    },
  },
});
export const {
  getEditProfile,
  deleteEditProfile,
  postEditProfile,
  updateEditProfile,
  geteditaddress,
  deleteeditaddress,
  posteditaddress,
  updateeditaddress,
  getCustomerPhoto,
  deleteCustomerPhoto,
  postCustomerPhoto,
} = CustomerEditProfile.actions;
export default CustomerEditProfile.reducer;
