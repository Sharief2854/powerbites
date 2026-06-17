import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      cartValue: 0
    },
    reducers: {
      addToCart: (state, action) => {
        state.items.push(action.payload);
      },
      removeCartItem: (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      },
      updateCart: (state, action) => {
        state.items = state.items.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      },
      addValue:((state,action)=>{
        state.cartValue = action.payload
      }),
      getItems: (state, action) => {
        state.items = action.payload;
      },
    },
  });
  
  export const { addToCart, removeCartItem, updateCart,getItems ,addValue} = CartSlice.actions;
  export default CartSlice.reducer;