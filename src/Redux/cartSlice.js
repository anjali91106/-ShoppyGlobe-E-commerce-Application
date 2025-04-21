import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            // Check if item already exists in the cart
            const existingItem = state.items.find(
              (item) => item.id === action.payload.id
            );
      
            if (existingItem) {
              // Just increase the quantity
              existingItem.quantity += action.payload.quantity;
            } else {
              // Add new item to the cart
              state.items.push(action.payload);
            }
          },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    }
})


export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;











