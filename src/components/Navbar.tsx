import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { FaBars, FaTimes, FaUser, FaHeart, FaShoppingCart, FaSun, FaMoon, } from 'react-icons/fa'
import styles from '../styles/Navbar.module.scss';
import Modal from './Modal'
import logoImg from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { getCartItemsCount } from '../redux/cartSlice';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown'
import { isDarkMode, toggleTheme } from '../redux/themeSlice';
import { useAppDispatch } from '../redux/store';
import { IoLanguage } from 'react-icons/io5';
import { language, setLanguage } from '../redux/languageSlice'
import { translate } from '../locales/index';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [modalType, setModalType] = useState("");
  const cartItemsCount = useSelector(getCartItemsCount);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const isDark = useSelector(isDarkMode);
  const currentLang = useSelector(language);


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
  const handleToggleLang = () => {
    dispatch(setLanguage(currentLang));
  }
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo} onClick={() => router("/")}>
        <img src={logoImg} alt="logo" />
        <span><BsShop /></span>
      </div>
      <div className={styles.navbarSearch}>
        <input className={styles.searchInput} type="text" placeholder={`${translate("searchPlaceholder", currentLang)}`} />
        {/* search icon */}
        <span className={styles.searchIcon}><FiSearch /></span>
      </div>
      <ul className={styles.navbarControls}>
        <button className={styles.controlsItemProfile} onClick={() => setOpenDropdown(!openDropdown)}><span><FaUser /></span>{translate("account", currentLang)}</button>
        {openDropdown && <Dropdown showModal={handleShowModal} />}
        <button className={styles.controlsItem} onClick={goToFavorites}><span><FaHeart /></span>{translate("favorites", currentLang)}</button>
        <button className={styles.controlsItem} onClick={goToCart} ><span><FaShoppingCart /></span>{translate("cart", currentLang)} ( {cartItemsCount} )</button>
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
              <button className={styles.mobileMenuAccountBtn} onClick={() => handleShowModal("account")}><span><FaUser /></span>{translate("account", currentLang)}</button>
              <button className={styles.mobileMenuBtn}><span><FaHeart /></span>{translate("favorites", currentLang)}</button>
              <button className={styles.mobileMenuBtn} onClick={goToCart}><span><FaShoppingCart /></span>{translate("cart", currentLang)}</button>
              <button className={styles.mobileMenuBtn} onClick={handleToggleLang}><span><IoLanguage /></span>{translate("language", currentLang)}  : {currentLang}</button>
              <button className={styles.mobileMenuBtn} onClick={handleDarkMode}><span>{isDark ? <FaSun /> : <FaMoon />}</span>{translate("mode", currentLang)} : {isDark ? `${translate("light", currentLang)}` : `${translate("dark", currentLang)}`}</button>
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