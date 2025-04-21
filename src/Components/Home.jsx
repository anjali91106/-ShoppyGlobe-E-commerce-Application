
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Home = () => {
  const {items, status, error } = useSelector((state) => state.products);


  return (
    <>

    {status === "loading" && <p>Loading...</p>}
    {status === "failed" && <p>Error: {error}</p>}

     <br /><h1 className="welcome">Welcome to <span className="brand-name">ShoppyGlobe</span></h1>
     <br />
    <div className="ProductDetails">
      
      {items?.map((product) => (
        <div key={product.id} className="productbox">
         <img src={product.thumbnail || '/placeholder-image.jpg'} 
         alt={product.title} 
         loading="lazy"
         />
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

export default Home
