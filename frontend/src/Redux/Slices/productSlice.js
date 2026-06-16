import { createSlice } from "@reduxjs/toolkit"


const productReducer = createSlice({
    name:'product',
    initialState:{
        products:[]
//         products : [
//   {
//     id: 1,
//     name: "Honey Granola Bars",
//     description: "Crunchy homemade bars made with oats, nuts, seeds and honey.",
//     price: 350,
//     photo:
//       "https://www.tasteofhome.com/wp-content/uploads/2025/01/Honey-Oatmeal-Granola-Bars_EXPS_TOHD24_38126_SoniaBozzo_social.jpg",
//   },
//   {
//     id: 2,
//     name: "Date Nut Bars",
//     description: "Healthy snack bars with dates, almonds and cashews.",
//     price: 420,
//     offerPrice: 349,
//     image:
//       "https://ourstate.s3.amazonaws.com/assets/2020/11/Dec20-date-nut-bars-recipe-matthulsman.jpg",
//   },
//   {
//     id: 3,
//     name: "Snack Jar Mix",
//     description: "A crispy colorful homemade snack jar for tea-time.",
//     price: 250,
//     offerPrice: 199,
//     image:
//       "https://somethingnutritiousblog.com/wp-content/uploads/2022/12/22E23C99-8A67-4CD2-9F7D-0C27EFFCFBDD-scaled-1.jpeg",
//   },
//   {
//     id: 4,
//     name: "Coconut Ladoo",
//     description: "Soft coconut and jaggery ladoos with homemade taste.",
//     price: 300,
//     offerPrice: 259,
//     image:
//       "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/cf586bb5728f6bdeaf9e8a0ad46574c53f2c4cc1.jpg",
//   },
//   {
//     id: 5,
//     name: "Peanut Ladoo",
//     description: "Nutritious homemade peanut sweets with rich flavor.",
//     price: 280,
//     offerPrice: 229,
//     image:
//       "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8c771372be545afb39db28e4e0c2b072b9576042.jpg",
//   },
//   {
//     id: 6,
//     name: "Motichoor Ladoo",
//     description: "Classic homemade festive ladoos made fresh.",
//     price: 320,
//     offerPrice: 279,
//     image:
//       "https://somethingnutritiousblog.com/wp-content/uploads/2022/12/22E23C99-8A67-4CD2-9F7D-0C27EFFCFBDD-scaled-1.jpeg",
//   },
//   {
//     id: 7,
//     name: "Healthy Bar Bites",
//     description: "Mini homemade energy bites with nuts and dry fruits.",
//     price: 260,
//     offerPrice: 219,
//     image:
//       "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/524c98ba5c028c5d966cbad1866fdd015ee35571.jpg",
//   },
//   {
//     id: 8,
//     name: "Festive Sweet Pack",
//     description: "Premium homemade sweets pack for gifting and family.",
//     price: 500,
//     offerPrice: 449,
//     image:
//       "https://rukminim2.flixcart.com/image/480/480/xif0q/sweet-mithai/l/r/n/1-9-saugaat-1-diwali-gift-hamper-sweets-gift-pack-10-assorted-original-imagghe8ynhqzxwh.jpeg?q=90",
//   },
//   {
//     id: 9,
//     name: "Dry Fruit Sweet Pack",
//     description: "Homemade rich sweet pack with premium dry fruits.",
//     price: 450,
//     offerPrice: 399,
//     image:
//       "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8c771372be545afb39db28e4e0c2b072b9576042.jpg",
//   },
//   {
//     id: 10,
//     name: "Premium Granola Pack",
//     description: "Wholesome granola pack for breakfast and snacking.",
//     price: 390,
//     offerPrice: 329,
//     image:
//       "https://m.media-amazon.com/images/I/61xZ6a4EqxL._AC_UF894,1000_QL80_.jpg",
//   },
//   {
//     id: 11,
//     name: "Classic Energy Squares",
//     description: "Soft chewy squares filled with nuts and seeds.",
//     price: 340,
//     offerPrice: 289,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMxfLLweavQcrDecJxYf84k85_W2lT_O-b1wQ-kGJFJsrUZZnWaoyotQ&s=10",
//   },
//   {
//     id: 12,
//     name: "Traditional Sweet Box",
//     description: "Beautiful assorted homemade sweets for occasions.",
//     price: 520,
//     offerPrice: 469,
//     image:
//       "https://www.gurchini.com/cdn/shop/files/LuxuaryAssortedBrownFlowerBoxof10Pcs_acb4c3bf-b6e7-4fbf-a782-88b9ffb918a8.jpg?v=1727290658&width=2048",
//   },
// ]
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
                    return action.payload
                }
                return product
            })
        }
    }
})

export const {getProducts,deleteProducts, postProducts, updateProduct} = productReducer.actions
export default productReducer.reducer