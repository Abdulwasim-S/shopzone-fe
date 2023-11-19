import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Reducer/products.reducer";

export default configureStore({
  reducer: {
    productReducer: productSlice,
  },
});
