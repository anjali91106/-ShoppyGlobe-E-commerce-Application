// CartPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  console.log("CArt Page REndered")

  function handleRemoveFromCart(item){
    dispatch(removeFromCart(item));
  }

  return (
    <div>
    <h2 className='text'>Welcome To Your Cart In ShoppyGlobe</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      cartItems.map((item, index) => (
        <div className='cartproduct' key={index}>
          <div className='cartcontainer'>
             <img src={item.thumbnail} alt={item.title} />
          <Link to={`/ProductDetails/${item.id}`}><button className='viewBtn'>view Details</button></Link>
          
          <h3>{item.title}</h3>
          {/* <p>Quantity: {item.quantity}</p> */}
          <p>Price: ₹{item.price}</p>
          <button className='cartBtn' onClick={() => handleRemoveFromCart(item)}>Remove from Cart</button>
          <button className='cartBtn'>Buy Now</button>
          </div>
         
        </div>
      ))
    )}
  </div>
  );
};


export default Cart;