import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { FaBars, FaTimes, FaUser, FaUserCircle, FaHeart, FaShoppingCart } from 'react-icons/fa'
import styles from '../styles/Navbar.module.scss';
import LoginModal from './LoginModal'
import logoImg from '../assets/images/logo.png';
function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleShowModal = (text: string) => {
    setShowModal(!showModal);
    setModalType(text)
  }
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
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
        <button className={styles.controlsItem}><span><FaHeart /></span>Favorites</button>
        <button className={styles.controlsItem}><span><FaShoppingCart /></span>Cart</button>
        <button className={styles.controlsItemMenu} onClick={() => setShowNav(true)}>
          <FaBars />
        </button>
      </ul>

      {/* mobile menu */}
      {
        showNav &&
        (<div className={styles.navbarControlsMobileMenu}>
          <div className={styles.mobileMenuContent}></div>
          <button className={styles.mobileMenuExitBtn} onClick={() => setShowNav(false)}>
            <FaTimes />
          </button>
          {
            !isLogin ?
              <ul className={styles.mobileMenuList}>
                <button className={styles.mobileMenuLoginBtn} onClick={() => handleShowModal("login")}><span><FaUser /></span>Login</button>
                <button className={styles.mobileMenuBtn}><span><FaHeart /></span>Favorites</button>
                <button className={styles.mobileMenuBtn}><span><FaShoppingCart /></span>Cart</button>
              </ul> :
              <ul className={styles.mobileMenuList}>
                <button className={styles.mobileMenuBtn}><span><FaUserCircle /></span>Profile</button>
                <button className={styles.mobileMenuBtn}><span><FaHeart /></span>Favorites</button>
                <button className={styles.mobileMenuBtn}><span><FaShoppingCart /></span>Cart</button>
                <button className={styles.mobileMenuBtn}><span><BiLogOut /></span>Logout</button>
              </ul>
          }
        </div>)
      }
      {
        showModal && <LoginModal show={handleShowModal} modalType={modalType} />
      }
    </nav>
  )
}

export default Navbar