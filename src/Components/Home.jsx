import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";
import { showToast } from "../Redux/uiSlice";
import { fetchProducts } from "../Redux/productsSlice";
import { useEffect } from "react";

const Home = () => {
  const {items, status, error} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts(""));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product }));
    dispatch(showToast(`${product.title} added to cart!`));
  };

  console.log("Home component - items:", items); // Debug log
  console.log("Home component - status:", status); // Debug log

  return (
    <>

    {status === "loading" && <p>Loading...</p>}
    {status === "failed" && <p>Error: {error}</p>}

     <br /><h1 className="welcome">Welcome to <span className="brand-name">ShoppyGlobe</span></h1>
     <br />
    <div className="ProductDetails">
      
      {(!items || items?.length === 0) && status === "succeeded" && (
        <div className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <h2 className="not-found-title">No Products Found</h2>
          <p className="not-found-message">
            We couldn't find any products matching your search. 
            Try searching with different keywords.
          </p>
          <button 
            className="clear-search-btn" 
            onClick={() => dispatch(fetchProducts(""))}
          >
            Clear Search & Show All Products
          </button>
        </div>
      )}
      
      {items && items?.map((product) => (
        <div key={product.id} className="productbox">
         <img src={product.thumbnail || '/placeholder-image.jpg'} 
         alt={product.title} 
         loading="lazy"
         />
         <h3>{product.title}</h3>
         <p>Rating ⭐: {product.rating}</p>
         <p>Brand: {product.brand}</p>
         <p className="price">${product.price}</p>

        <div className="product-actions">
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <Link to={`/ProductDetails/${product.id}`} ><button>More Details</button></Link>
        </div>
         
        </div>
      ))}
    </div>

    </>
  )
}

export default Home
