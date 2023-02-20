import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { FaBars, FaTimes, FaUser, FaUserCircle, FaHeart, FaShoppingCart } from 'react-icons/fa'
import styles from '../styles/Navbar.module.scss';
import LoginModal from './LoginModal'
import logoImg from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { getCartItemsCount } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const cartItemsCount = useSelector(getCartItemsCount);

  const router = useNavigate();
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
        <button className={styles.controlsItemProfile} onClick={() => handleShowModal("login")}>
          <span><FaUser /></span>Login
        </button>
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
          <div className={styles.mobileMenuContent}>
            <button className={styles.mobileMenuExitBtn} onClick={() => setShowNav(false)}>
              <FaTimes />
            </button>
            <ul className={styles.mobileMenuList}>
              <button className={styles.mobileMenuLoginBtn} onClick={() => handleShowModal("account")}><span><FaUser /></span>Account</button>
              <button className={styles.mobileMenuBtn}><span><FaHeart /></span>Favorites</button>
              <button className={styles.mobileMenuBtn} onClick={goToCart}><span><FaShoppingCart /></span>Cart</button>
              <button className={styles.mobileMenuBtn}>Language</button>
              <button className={styles.mobileMenuBtn}>Mode</button>
            </ul>
          </div>
        </div>)
      }
      {
        showModal && <LoginModal show={handleShowModal} modalType={modalType} />
      }
    </nav>
  )
}

export default Navbar