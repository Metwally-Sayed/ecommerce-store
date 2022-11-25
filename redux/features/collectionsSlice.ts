import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection, } from "types";


const initialState: Collection[] = []

export const CollectionsSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    getAllCollections: (state, action: PayloadAction<Collection[]>) => {
      return action.payload
    }
  }
})


export const { getAllCollections } = CollectionsSlice.actions

export default CollectionsSlice.reducer