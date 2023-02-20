import React from 'react'
import styles from '../styles/Dropdown.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {isDarkMode, toggleTheme} from '../redux/themeSlice';
import { useAppDispatch } from '../redux/store';
import { FaSun , FaMoon, FaUserAlt, FaHeart, FaShoppingCart} from 'react-icons/fa';
interface Props {
  showModal: (text: string) => void;
}
const DropdownProfile: React.FC<Props> = ({ showModal }) => {
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const isDark = useSelector(isDarkMode);
    
    // change theme
    const handleDarkMode = () => {
      dispatch(toggleTheme());
    }
  return (

    <div className={`${styles.dropdownContainer} ${isDark ? styles.dark : styles.light}`}>
      <ul className={styles.dropdownContent}>
        <li className={styles.dropdownItem} onClick={() => showModal("account")}><span className={styles.dropdownIcon}><FaUserAlt/></span>Account</li>
        <li className={styles.dropdownItemTablet} onClick={() => router("/favorites")}><span className={styles.dropdownIcon}><FaHeart/></span>Favorites</li>
        <li className={styles.dropdownItemTablet} onClick={() => router("/cart")}><span className={styles.dropdownIcon}><FaShoppingCart/></span>Cart</li>
        <li className={styles.dropdownItem}>Language</li>
        <li className={styles.dropdownItem} onClick={handleDarkMode}><span className={styles.dropdownIcon}>{isDark ? <FaSun/> : <FaMoon/>}</span>Mode: {isDark ? "Light" : "Dark"}</li>
      </ul>
    </div>
  )
}

export default DropdownProfile