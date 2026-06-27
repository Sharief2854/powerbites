import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";


export const getItems = createAsyncThunk(
  "cart/getItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart/getCart`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/cart/setCart`, productData);
      return response.data.cartItem;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      await api.post(`/cart/setQuantity/${cartId}`, { quantity });
      return { _id: cartId, quantity };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/deleteItem/${cartId}`);
      return cartId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartValue: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    addValue: (state, action) => {
      state.cartValue = action.payload.reduce((total, current) => {
        return total + current.quantity;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.cartValue = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.cartValue = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.cartValue += action.payload.quantity;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          const oldQuantity = state.items[index].quantity;
          state.items[index].quantity = action.payload.quantity;
          state.cartValue = state.cartValue - oldQuantity + action.payload.quantity;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload);
        if (index !== -1) {
          state.cartValue -= state.items[index].quantity;
          state.items.splice(index, 1);
        }
      });
  },
});

export const { clearCart, addValue } = cartSlice.actions;
export default cartSlice.reducer;
