import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CSS Files/Global.css';

const OrderHistory = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
      setOrders(savedOrders);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="order-history-container">
        <div className="auth-required">
          <h2>Please Login</h2>
          <p>You need to be logged in to view your order history.</p>
          <Link to="/login" className="login-button">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h1>Order History</h1>
        <p>Welcome back, {user?.name || 'User'}!</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="continue-shopping">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id || index + 1}</h3>
                  <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="order-total">
                  <span>${order.total}</span>
                </div>
              </div>
              
              <div className="order-items-preview">
                {order.items && order.items.slice(0, 3).map(item => (
                  <img 
                    key={item.id} 
                    src={item.thumbnail} 
                    alt={item.title}
                    title={item.title}
                  />
                ))}
                {order.items && order.items.length > 3 && (
                  <span className="more-items">+{order.items.length - 3}</span>
                )}
              </div>

              <div className="order-status">
                <span className="status-badge">Delivered</span>
                <Link to="#" className="view-order-details">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Link to="/" className="back-to-shopping">← Continue Shopping</Link>
    </div>
  );
};

export default OrderHistory;
