import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { FaBars, FaTimes, FaUser, FaHeart, FaShoppingCart, FaSun , FaMoon, } from 'react-icons/fa'
import styles from '../styles/Navbar.module.scss';
import Modal from './Modal'
import logoImg from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { getCartItemsCount } from '../redux/cartSlice';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown'
import {isDarkMode, toggleTheme} from '../redux/themeSlice';
import { useAppDispatch } from '../redux/store';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [modalType, setModalType] = useState("");
  const cartItemsCount = useSelector(getCartItemsCount);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const isDark = useSelector(isDarkMode);

  const handleShowModal = (text: string) => {
    setShowModal(!showModal);
    setModalType(text)
  }
  const goToCart = () => {
    router("/cart");
  }
  const goToFavorites = () => {
    router("/favorites");
  }
    // change theme
    const handleDarkMode = () => {
      dispatch(toggleTheme());
    }
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo} onClick={() => router("/")}>
        <img src={logoImg} alt="logo" />
        <span><BsShop /></span>
      </div>
      <div className={styles.navbarSearch}>
        <input className={styles.searchInput} type="text" placeholder='Search product' />
        {/* search icon */}
        <span className={styles.searchIcon}><FiSearch /></span>
      </div>
      <ul className={styles.navbarControls}>
        <button className={styles.controlsItemProfile} onClick={() => setOpenDropdown(!openDropdown)}>
          <span><FaUser /></span>Account
        </button>
       {openDropdown && <Dropdown showModal={handleShowModal} />}
        <button className={styles.controlsItem} onClick={goToFavorites}><span><FaHeart /></span>Favorites</button>
        <button className={styles.controlsItem} onClick={goToCart} ><span><FaShoppingCart /></span>Cart ( {cartItemsCount} )</button>
        <button className={styles.controlsItemMenu} onClick={() => setShowNav(true)}>
          <FaBars />
        </button>
      </ul>

      {/* mobile menu */}
      {
        showNav &&
        (<div className={styles.navbarControlsMobileMenu}>
          <div className={`${styles.mobileMenuContent} ${isDark ? styles.dark : styles.light}`}>
            <button className={styles.mobileMenuExitBtn} onClick={() => setShowNav(false)}>
              <FaTimes />
            </button>
            <ul className={styles.mobileMenuList}>
              <button className={styles.mobileMenuAccountBtn} onClick={() => handleShowModal("account")}><span><FaUser /></span>Account</button>
              <button className={styles.mobileMenuBtn}><span><FaHeart /></span>Favorites</button>
              <button className={styles.mobileMenuBtn} onClick={goToCart}><span><FaShoppingCart /></span>Cart</button>
              <button className={styles.mobileMenuBtn}>Language</button>
              <button className={styles.mobileMenuBtn} onClick={handleDarkMode}><span>{isDark ? <FaSun/> : <FaMoon/>}</span>Mode: {isDark ? "Light" : "Dark"}</button>
            </ul>
          </div>
        </div>)
      }
      {
        showModal && <Modal show={handleShowModal} modalType={modalType} />
      }
    </nav>
  )
}

export default Navbar