import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
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
    },
  });
  
  export const { addToCart, removeCartItem, updateCart } = CartSlice.actions;
  export default CartSlice.reducer;