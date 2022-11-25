import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./features/cartSlice";
import { CollectionsSlice } from "./features/collectionsSlice";


export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    collection: CollectionsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch