import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import './CSS Files/Global.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateSubtotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some amazing products to your cart!</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <Link to="/" className="continue-shopping">← Continue Shopping</Link>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <Link to={`/ProductDetails/${item.id}`} className="item-title">
                  <h3>{item.title}</h3>
                </Link>
                <p className="item-brand">Brand: {item.brand}</p>
                <p className="item-price">${item.price}</p>
              </div>

              <div className="quantity-controls">
                <label>Qty:</label>
                <div className="quantity-buttons">
                  <button 
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="item-subtotal">
                  <strong>${calculateSubtotal(item)}</strong>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items):</span>
              <span>${calculateTotal()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>

            <div className="checkout-actions">
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
              <button onClick={() => navigate('/checkout')} className="buy-now-btn">
                Buy Now
              </button>
              {!isAuthenticated && (
                <p className="login-prompt">
                  <Link to="/login">Login</Link> for faster checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;