import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
      },
      title: {
        type: String,
        required: true
      },
      description: String,
      price: {
        type: Number,
        required: true
      },
      discountPercentage: Number,
      rating: Number,
      stock: Number,
      brand: String,
      category: String,
      thumbnail: String,
      images: [String] // Array of image URLs
    }, { timestamps: true });

    
const products = mongoose.model("products", productSchema);
export const cartItems = mongoose.model("cartItems", productSchema);
export default products;

// export default mongoose.model("products", productSchema);












