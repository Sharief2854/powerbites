import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../Slices/productSlice"
import userReducer from "../Slices/userSlice"
import CustomerEditProfile from "../Slices/CM_ProfileSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        editprofile: CustomerEditProfile,
        
    }
})

export default store