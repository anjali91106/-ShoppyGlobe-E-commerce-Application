// import mongoose from "mongoose";
// import products from "./Model/products.model.js";

//fetching the data data from dummy api to our mongodb databse to make our own api 

// const sendProducts = async () => {
//     try {
//         await mongoose.connect("mongodb://localhost:27017/shoppydb");
    
//         const res = await fetch("https://dummyjson.com/products");
//         const data = await res.json();
    
//         if (Array.isArray(data.products)) {
//           await products.insertMany(data.products);
//           console.log("✅ Products seeded successfully");
//         } else {
//           console.log("❌ Unexpected response format");
//         }
//       } catch (err) {
//         console.log("❌ Some error occurred when fetching the data!!", err);
//       } finally {
//         await mongoose.disconnect();
//       }
// }

// sendProducts();

