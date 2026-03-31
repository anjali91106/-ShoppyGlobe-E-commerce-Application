import { Link } from 'react-router-dom';
import './CSS Files/Global.css';
import { useState, useEffect } from 'react';
import { fetchProducts } from "../Redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import { FaBars, FaTimes, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa'; 
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingBagHeart } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { BsFillSearchHeartFill } from "react-icons/bs";

const Header = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        dispatch(fetchProducts(query));
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchProducts(query));
      setQuery(""); // Clear the search input after submission
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className="header-container">
        <div className="logo-title">
          <h1 className='headerh1 floating'>ShoppyGlobe<TbShoppingBagHeart /></h1>
          <div className="burger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link className='nav-link' to="/" onClick={() => setMenuOpen(false)}>
            <li><FaHome/> Home</li>
          </Link>
          <Link className='nav-link' to="/ProductList" onClick={() => setMenuOpen(false)}>
            <li><AiOutlineProduct /> Products</li>
          </Link>
          <Link className='nav-link' to="/cart" onClick={() => setMenuOpen(false)}>
            <li><MdShoppingCartCheckout /> Cart ({getCartCount()})</li>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link className='nav-link' to="/order-history" onClick={() => setMenuOpen(false)}>
                <li><FaUser /> {user?.name || 'User'}</li>
              </Link>
              <button className='nav-link logout-btn' onClick={handleLogout}>
                <li><FaSignOutAlt /> Logout</li>
              </button>
            </>
          ) : (
            <Link className='nav-link' to="/login" onClick={() => setMenuOpen(false)}>
              <li><FaUser /> Login</li>
            </Link>
          )}
          
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input 
              id="search" 
              type="text" 
              placeholder="Search amazing products..."
              onChange={handleSearchChange}
              value={query}
            />
            <button type="submit" className="search-button">
              <BsFillSearchHeartFill/>
            </button>
          </form>
        </ul>
      </div>
    </>
  );
};

export default Header;
