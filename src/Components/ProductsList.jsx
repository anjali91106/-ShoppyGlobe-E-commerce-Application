import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ProductList = () => {

    const {items, status, error} = useSelector((state) => state.products);

    return (
        <>
    
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
    
        <div className="ProductDetails">
          {items?.length === 0 && status === "succeeded" && (
            <div className="not-found-container">
              <div className="not-found-icon">🔍</div>
              <h2 className="not-found-title">No Products Found</h2>
              <p className="not-found-message">
                We couldn't find any products matching your search. 
                Try searching with different keywords.
              </p>
              <button 
                className="clear-search-btn" 
                onClick={() => window.location.reload()}
              >
                Clear Search & Show All Products
              </button>
            </div>
          )}
          
          {items?.map((product) => (
            <div key={product.id} className="productbox">
             <img src={product.thumbnail || '/placeholder-image.jpg'} 
             alt={product.title} />
             <h3>{product.title}</h3>
             <p>Rating ⭐: {product.rating}</p>
             <p>Brand: {product.brand}</p>
             <p className="price">${product.price}</p>
    
            <Link to={`/ProductDetails/${product.id}`} ><button>More Details</button></Link>
             
            </div>
          ))}
        </div>
    
        </>
      )
} 

export default ProductList;