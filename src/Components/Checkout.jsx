import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../Redux/cartSlice';
import './CSS Files/Global.css';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderData = {
        ...formData,
        items: cartItems,
        total: calculateTotal(),
        orderDate: new Date().toISOString(),
        orderId: Date.now()
      };

      // Save order to localStorage
      try {
        const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
        existingOrders.push(orderData);
        localStorage.setItem(`orders_${user.id}`, JSON.stringify(existingOrders));
      } catch (error) {
        console.error('Failed to save order:', error);
      }

      dispatch(clearCart());
      navigate('/order-confirmation', { 
        state: { 
          orderData: orderData
        }
      });
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checkout</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <Link to="/cart" className="back-to-cart">← Back to Cart</Link>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>

            <h3>Payment Method</h3>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={formData.paymentMethod === 'credit-card'}
                  onChange={handleChange}
                />
                Credit Card
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit-card"
                  checked={formData.paymentMethod === 'debit-card'}
                  onChange={handleChange}
                />
                Debit Card
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash-on-delivery"
                  checked={formData.paymentMethod === 'cash-on-delivery'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="checkout-button"
            >
              {isProcessing ? 'Processing...' : `Place Order • $${calculateTotal()}`}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
