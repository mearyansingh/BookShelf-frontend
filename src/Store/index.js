import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import { booksApi } from './bookApi'
import { ordersApi } from './ordersApi'

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      [booksApi.reducerPath]: booksApi.reducer,
      [ordersApi.reducerPath]: ordersApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})