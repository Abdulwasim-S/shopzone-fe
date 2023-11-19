import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
    myOrders: [],
    adminOrders: [],
    loggedUserName: "",
    isLoggedIn: false,
  },
  reducers: {
    //For Admin
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (ele) => ele._id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const productList = state.products.filter(
        (ele) => ele._id !== action.payload._id
      );
      state.products = [action.payload, ...productList];
    },
    //For User
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserName: (state, action) => {
      state.loggedUserName = action.payload;
    },
    logoutuser: (state, action) => {
      state.isLoggedIn = false;
      state.loggedUserName = "";
      state.cart = [];
      state.myOrders = [];
    },
    //For User Cart
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      const data = state.cart.filter((ele) => ele._id !== action.payload);
      state.cart = data;
    },
    setCartItem: (state, action) => {
      state.cart = action.payload;
    },
    //For User Order
    addToOrders: (state, action) => {
      state.cart.push(action.payload);
    },
    setToOrders: (state, action) => {
      state.myOrders = action.payload;
    },
  },
});
export const {
  setProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  setLoggedIn,
  setUserName,
  logoutuser,
  addToCart,
  deleteFromCart,
  addToOrders,
  setCartItem,
  setToOrders,
} = productSlice.actions;
export default productSlice.reducer;
