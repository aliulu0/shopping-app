import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { FaBars, FaTimes, FaUser, FaHeart, FaShoppingCart, FaSun, FaMoon, } from 'react-icons/fa'
import styles from '../styles/Navbar.module.scss';
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
import {getFilterText,setFilterText} from '../redux/filterSlice';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const cartItemsCount = useSelector(getCartItemsCount);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const isDark = useSelector(isDarkMode);
  const currentLang = useSelector(language);
  const filterText = useSelector(getFilterText);

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
  //change language
  const handleToggleLang = () => {
    dispatch(setLanguage(currentLang));
  }
  // toggle dropdown
  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown)
  }
  const goToAccountPage = () => {
    router("/account");
  }

  // filter products
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement> ) => {
    dispatch(setFilterText(event.target.value));
  }
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo} onClick={() => router("/")}>
        <img src={logoImg} alt="logo" />
        <span><BsShop /></span>
      </div>
      <div className={styles.navbarSearch}>
        <input className={styles.searchInput} type="text" value={filterText} onChange={handleSearch} placeholder={`${translate("searchPlaceholder", currentLang)}`} />
        {/* search icon */}
        <span className={styles.searchIcon}><FiSearch /></span>
      </div>
      <ul className={styles.navbarControls}>
        <button className={styles.controlsItemProfile} onClick={handleToggleDropdown}><span><FaUser /></span>{translate("account", currentLang)}</button>
         {openDropdown && <Dropdown onGoToAccount={goToAccountPage} />} 
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
              <button className={styles.mobileMenuAccountBtn} onClick={goToAccountPage}><span><FaUser /></span>{translate("account", currentLang)}</button>
              <button className={styles.mobileMenuBtn} onClick={goToFavorites}><span><FaHeart /></span>{translate("favorites", currentLang)}</button>
              <button className={styles.mobileMenuBtn} onClick={goToCart}><span><FaShoppingCart /></span>{translate("cart", currentLang)}</button>
              <button className={styles.mobileMenuBtn} onClick={handleToggleLang}><span><IoLanguage /></span>{translate("language", currentLang)}  : {currentLang}</button>
              <button className={styles.mobileMenuBtn} onClick={handleDarkMode}><span>{isDark ? <FaSun /> : <FaMoon />}</span>{translate("mode", currentLang)} : {isDark ? `${translate("light", currentLang)}` : `${translate("dark", currentLang)}`}</button>
            </ul>
          </div>
        </div>)
      }
    </nav>
  )
}

export default React.memo(Navbar);