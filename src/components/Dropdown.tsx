import React from 'react'
import styles from '../styles/Dropdown.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {isDarkMode, toggleTheme} from '../redux/themeSlice';
import { useAppDispatch } from '../redux/store';
import { FaSun , FaMoon, FaUserAlt, FaHeart, FaShoppingCart} from 'react-icons/fa';
import { language, setLanguage } from '../redux/languageSlice'
import {translate} from '../locales/index';
import {IoLanguage} from 'react-icons/io5';

interface Props {
  onGoToAccount: () => void;
}
const DropdownProfile: React.FC<Props> = ({ onGoToAccount }) => {
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const isDark = useSelector(isDarkMode);
  const currentLang = useSelector(language);
    
    // change theme
    const handleDarkMode = () => {
      dispatch(toggleTheme());
    }
    //change language
    const handleToggleLang = () => {
      dispatch(setLanguage(currentLang));
    }
  return (

    <div className={`${styles.dropdownContainer} ${isDark ? styles.dark : styles.light}`}>
      <ul className={styles.dropdownContent}>
        <li className={styles.dropdownItem} onClick={onGoToAccount}><span className={styles.dropdownIcon}><FaUserAlt/></span>{translate("account", currentLang)}</li>
        <li className={styles.dropdownItemTablet} onClick={() => router("/favorites")}><span className={styles.dropdownIcon}><FaHeart/></span>{translate("favorites", currentLang)}</li>
        <li className={styles.dropdownItemTablet} onClick={() => router("/cart")}><span className={styles.dropdownIcon}><FaShoppingCart/></span>{translate("cart", currentLang)}</li>
        <li className={styles.dropdownItem}onClick={handleToggleLang}><span className={styles.dropdownIcon}><IoLanguage/></span>{translate("language", currentLang)}  : {currentLang}</li>
        <li className={styles.dropdownItem} onClick={handleDarkMode}><span className={styles.dropdownIcon}>{isDark ? <FaSun/> : <FaMoon/>}</span>{translate("mode", currentLang)} : {isDark ? `${translate("light", currentLang)}` : `${translate("dark", currentLang)}`}</li>
      </ul>
    </div>
  )
}

export default React.memo(DropdownProfile);