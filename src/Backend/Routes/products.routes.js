import { allProducts, productSearchbyid, querySearch, showCart } from "../Controller/products.controller.js";
import express from "express"

const router = express.Router();

export function routes(app){
   app.get("/products", allProducts);
   app.get("/cart", showCart);
}

router.get("/search", querySearch);
router.get("/:id", productSearchbyid);


export default router;