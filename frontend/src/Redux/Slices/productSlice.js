import { createSlice } from "@reduxjs/toolkit"


const productReducer = createSlice({
    name:'product',
    initialState:{
        products : []
    },
    reducers:{
        getProducts:(state,action)=>{
            state.products = action.payload
        },
        deleteProducts:(state,action)=>{
            state.products = state.products.filter((product)=>product._id !== action.payload)
        },
        postProducts:(state,action)=>{
            state.products= state.products.push(action.payload)
        },
        updateProduct:(state,action)=>{
            state.products = state.products.map((product)=>{
                if(product._id === action.payload._id){
                        action.payload.image.map((newimg)=>{newimg.includes(product.image)?newimg:product.image.push(newimg)})
                    return action.payload
                }
                return product
            })
        }
    }
})

export const {getProducts,deleteProducts, postProducts, updateProduct} = productReducer.actions
export default productReducer.reducer