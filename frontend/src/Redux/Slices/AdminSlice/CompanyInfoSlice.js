import { createSlice } from "@reduxjs/toolkit";


const CompanyInfoSlice = createSlice({
    name: 'companyInfo',
    initialState: {
      info: [],
    },
    reducers: {
      addInfo: (state, action) => {
        state.info.push(action.payload);
      },
      getInfo: (state, action) => {
        state.info = action.payload;
      }
    }
  });
  
  export const { addInfo, getInfo } = CompanyInfoSlice.actions;
  export default CompanyInfoSlice.reducer;