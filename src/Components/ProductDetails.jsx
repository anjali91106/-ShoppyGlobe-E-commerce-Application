import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";
import { BsArrow90DegRight ,BsArrowReturnLeft } from "react-icons/bs";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch()


  const handleCartClick = () => {
    dispatch(addToCart({ ...product}));
  };
  


  useEffect(() => {
    fetch(`http://localhost:7002/products/${id}`)
      .then(res => {
       if(!res.ok) throw new Error("Product not found");
       return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => {console.error("Failed to fetch product:", err);
      setProduct(null);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (

    <div className="parent">
    <div className="product-gallery">
      <div className="image-container">
        <img
        src={product.thumbnail || "/placeholder-image.jpg"}
        alt={product.title || "Product Image"}
        className="main-image"
      />

      <h1>{product.title}</h1>
      <br />

      <div className="info">

            </div><br /><br />
            
            <h2>Brand: {product.brand}</h2>
      <p>Price: {product.price}</p>
      <p>DiscountPercentage: {product.discountPercentage}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p> 
      <Link to="/"><button className="backbtn">  back <BsArrowReturnLeft/> </button></Link>
      <button id="cartBtn" onClick={handleCartClick}>Add To Cart</button>
      <button id="cartBtn">Buy Now</button>
      <Link to="/cart"><button id="cartBtn">Go To Cart <BsArrow90DegRight/></button></Link>
      

      </div>
    </div>
    </div>
    
  );
}
