import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  } catch (error) {
    return [];
  }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: getCartFromStorage(),
        status: "idle",
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
              (item) => item.id === action.payload.id
            );
      
            if (existingItem) {
              existingItem.quantity += action.payload.quantity || 1;
            } else {
              state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            
            try {
              localStorage.setItem('cartItems', JSON.stringify(state.items));
            } catch (error) {
              console.error('Failed to save cart to localStorage:', error);
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            try {
              localStorage.setItem('cartItems', JSON.stringify(state.items));
            } catch (error) {
              console.error('Failed to save cart to localStorage:', error);
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                try {
                  localStorage.setItem('cartItems', JSON.stringify(state.items));
                } catch (error) {
                  console.error('Failed to save cart to localStorage:', error);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
            try {
              localStorage.setItem('cartItems', JSON.stringify(state.items));
            } catch (error) {
              console.error('Failed to clear cart from localStorage:', error);
            }
        }
    }
})

export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;











