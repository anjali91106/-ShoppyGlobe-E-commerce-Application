import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (query = "") => {
        const url = query 
        ? `https://dummyjson.com/products/search?q=${query}`
        : "https://dummyjson.com/products"; //fallbaCK TO FETCH ALL IF NO query
 

        const res = await fetch(url);
        if(!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        return data.products?.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description?.slice(0, 100) + "..." || "No description",
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category || "General",
          thumbnail: product.thumbnail,
          images: product.images || [],
        })) || []; //fallback to empty array if mapping fails
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {state.items = action.payload},
        addProducts: (state, action) => {state.products.push(action.payload)}
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state)=> {
            state.status = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
});

export const {setProducts, addProducts} = productSlice.actions;
export default productSlice.reducer;