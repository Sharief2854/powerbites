import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../Slices/productSlice"
import userReducer from "../Slices/userSlice"
import CartSlice from "../Slices/CM_CartSlice"
import CustomerEditProfile from "../Slices/CM_ProfileSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        editprofile: CustomerEditProfile,
<<<<<<< HEAD
        
=======
        cart: CartSlice

>>>>>>> 4b63e3e5e3774c32b69ed4189ce774b11ab8b08d
    }
})

export default store