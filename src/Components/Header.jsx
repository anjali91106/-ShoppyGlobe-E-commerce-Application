import { Link } from 'react-router-dom';
import './CSS Files/Global.css';
import { useState, useEffect } from 'react';
import { fetchProducts } from "../Redux/productsSlice";
import { useDispatch } from "react-redux";
import { FaBars, FaTimes, FaHome  } from 'react-icons/fa'; // install react-icons if not already
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingBagHeart } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { BsFillSearchHeartFill } from "react-icons/bs";

const Header = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(query));
  }, [query, dispatch]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      <div className="header-container">
        <div className="logo-title">
          <h1 className='headerh1'>ShoppyGlobe<TbShoppingBagHeart /></h1>
          <div className="burger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link className='nav-link' to="/" onClick={() => setMenuOpen(false)}><li>Home <FaHome/> </li></Link>
          <Link className='nav-link' to="/ProductList" onClick={() => setMenuOpen(false)}><li>Products<AiOutlineProduct /></li></Link>
          <Link className='nav-link'  to="/cart" onClick={() => setMenuOpen(false)}><li>Cart<MdShoppingCartCheckout /></li></Link>
          <div>
            <input 
            id="search" 
            type="text" 
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <BsFillSearchHeartFill/>
          </div>
          
        </ul>
      </div>
    </>
  );
};

export default Header;
