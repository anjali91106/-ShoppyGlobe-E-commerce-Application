import { useLocation, Link } from 'react-router-dom';
import './CSS Files/Global.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  if (!orderData) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <h2>Order Not Found</h2>
          <p>No order information available.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase, {orderData.firstName}!</p>
        
        <div className="order-details">
          <h3>Order Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span>Order Date:</span>
              <span>{new Date(orderData.orderDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span>Order Total:</span>
              <span>${orderData.total}</span>
            </div>
            <div className="detail-item">
              <span>Payment Method:</span>
              <span>{orderData.paymentMethod.replace('-', ' ')}</span>
            </div>
            <div className="detail-item">
              <span>Shipping Address:</span>
              <span>
                {orderData.address}, {orderData.city}, {orderData.zipCode}
              </span>
            </div>
          </div>
        </div>

        <div className="order-items">
          <h3>Items Ordered</h3>
          {orderData.items.map(item => (
            <div key={item.id} className="order-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
          <Link to="/order-history" className="view-orders">View Order History</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
