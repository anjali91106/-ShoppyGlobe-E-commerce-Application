import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams(); // get the product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // fetch the individual product by ID
    fetch(`https://example.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-gallery">
      <img
        src={product.thumbnail || "/placeholder.jpg"}
        alt={product.title || "Product Image"}
        className="main-image"
      />
      <h1>{product.title}</h1>
      <h2>{product.brand}</h2>
    </div>
  );
}
