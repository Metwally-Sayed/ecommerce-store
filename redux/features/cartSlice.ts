import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "types";



const initialState: CartItem[] = []

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const product = state.find(product => product.id === action.payload.id)
    //   if (!product) {
    //     return [...state,action.payload]
    //   } else {
    //     state.map((item: CartItem) => {
    //       if (item.id === action.payload.id) {
    //         console.log(action.payload);
    //         return { ...item, quantity: action.payload.quantity }
    //       } else {
    //         return item
    //       }
    //     })
    //     // product.quantity += 1
    //     // product.price = +product.price + +action.payload.price
    //     //product.quantity = product.quantity + 1
    //   }
    // },




    addToCart: (state, action: PayloadAction<CartItem>) => {
      let itemInCart = state.find(
        (product: Product) => product.id === action.payload.id
      )
      if (itemInCart) {
        return state.map((item: CartItem) => {
          if (item.id === action.payload.id) {
            console.log(item.quantity)
            return { ...item, quantity: action.payload.quantity }
          } else {
            return item
          }
        })
      } else {
        return [...state, action.payload]
      }
    },





    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      // const existProduct = state.find(product => product.id === action.payload.id)
      // if (existProduct) {
      //    state.filter((item) => item.id !== existProduct.id)
      // } else {
      //   return state
      // }

      return state.filter((item) => item.id !== action.payload.id)

    },

    addQuantity: (state, action: PayloadAction<CartItem>) => {
      const product = state.find(product => product.id === action.payload.id)
      if (product) {
        state.map((item) => {
          if (item.id = action.payload.id) {
            return { ...item, quantity: action.payload.quantity }
          } else {
            return item
          }
        }
        )
      }
    }

  }
})


export const { addToCart, removeFromCart, addQuantity } = CartSlice.actions

export default CartSlice.reducer