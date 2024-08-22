import { createSlice } from "@reduxjs/toolkit";

const INNITIAL_VALUE = {
  prods: [],
  selectCategory: "",
  isLiked: false,
};

const ProductSlice = createSlice({
  name: "products",
  initialState: INNITIAL_VALUE,

  reducers: {
    setProducts: (state, action) => {
      state.prods = action.payload;
    },
    setSelectCategory: (state, action) => {
      state.selectCategory = action.payload;
    },
  },
});

export default ProductSlice.reducer;
export const { setProducts, setSelectCategory } = ProductSlice.actions;
