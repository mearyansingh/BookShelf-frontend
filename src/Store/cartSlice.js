import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   cartItems: [],
   totalPrice: 0,
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const existing = state.cartItems.find(item => item._id === action.payload._id)
         if (existing) {
            existing.quantity += 1
         } else {
            state.cartItems.push({ ...action.payload, quantity: 1 })
         }
      },
      removeFromCart: (state, action) => {
         state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
      },
      clearCart: (state) => {
         state.cartItems = []
         state.totalPrice = 0
      }
   },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer