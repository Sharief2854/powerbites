import { createSlice } from "@reduxjs/toolkit"


const productReducer = createSlice({
    name:'product',
    initialState:{
        products:[]
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        },
        postProduct:(state,action)=>{
            state.products.push(action.payload)
        }
    }
})

export const {setProducts, postProduct} = productReducer.actions
export default productReducer.reducer