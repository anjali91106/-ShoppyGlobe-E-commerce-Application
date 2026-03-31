import { useEffect } from 'react';
import './CSS Files/Global.css';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-notification">
      <div className="toast-content">
        <span className="toast-icon">✓</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
