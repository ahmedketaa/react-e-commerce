import { configureStore } from "@reduxjs/toolkit";
import products from "./categorySlice";

export const store = configureStore({
  reducer: {
    products,
  },
});
