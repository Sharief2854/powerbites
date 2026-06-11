import { createSlice } from "@reduxjs/toolkit"


const productReducer = createSlice({
    name:'product',
    initialState:{
        products:[]
    },
    reducers:{
        setProducts:(state,action)=>{
            console.log(action.payload);
            
            state.products = action.payload
        },
        postProduct:(state,action)=>{
            state.products= state.products.push(action.payload)
        },
        updateProduct:(state,action)=>{
            state.products = state.products.map((product)=>{
                if(product._id === action.payload._id){
                    return action.payload
                }
                return product
            })
        },
    }
})

export const {setProducts, postProduct, updateProduct} = productReducer.actions
export default productReducer.reducer