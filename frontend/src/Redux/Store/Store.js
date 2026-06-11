import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../Slices/productSlice"

const store = configureStore({
    reducer: {
        product: productReducer
    }
})

export default store