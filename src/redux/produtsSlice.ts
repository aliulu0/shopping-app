import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsState } from "../model/types";
import type { RootState } from "./store";

// get all products from the API
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    if(response.ok){
        const data = await response.json();
        return data.products;
    }else {
        console.log("failed to fetch products");
    }
  }
);

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "unknown error";
      });
  },
});

export const getAllProducts =(state : RootState) => state.productList.products; 
export const getAllProductsStatus = (state : RootState) => state.productList.status;
export const getError = (state : RootState) => state.productList.error;
export default productsSlice.reducer;
