import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../Slices/productSlice"
import userReducer from "../Slices/userSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer

    }
})

export default store