import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../Slices/productSlice"
import userReducer from "../Slices/userSlice"
import CartSlice from "../Slices/CM_CartSlice"
import CustomerEditProfile from "../Slices/CM_ProfileSlice"
import ReviewSlice from "../Slices/ReviewSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        editprofile: CustomerEditProfile,
        cart: CartSlice,
        Review: ReviewSlice,
    }
})

export default store