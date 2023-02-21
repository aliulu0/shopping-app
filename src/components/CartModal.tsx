import React from 'react'
import styles from './../styles/CartModal.module.scss';
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import {getIsFavorite} from '../redux/cartModalSlice'
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';
import { isDarkMode } from '../redux/themeSlice';
interface Props{
  onClose : () => void;
  onRemove:() => void;
  onRemoveAndAddFavorites:() => void;
}
const CartModal: React.FC<Props> = ({onClose, onRemove,onRemoveAndAddFavorites}) => {
  const isFavorite = useSelector(getIsFavorite);
  const currentLang = useSelector(language);
  const isDark = useSelector(isDarkMode)
  return (
    <div className={`${styles.modalContainer}`}>
      <button className={styles.modalCloseBtn} onClick={onClose}>
            <FaTimes />
          </button>
        <div className={`${styles.modalContent} ${isDark ? styles.dark : styles.light}`}>
            <div className={styles.cartConfirm}>
              <h3 className={styles.cartConfirmHeader}>{translate("cartModalHeader", currentLang)}</h3>
              <div className={styles.cartConfirmBtnContainer}>
                <button onClick={onRemove}>{translate("removeItemFromCart", currentLang)}</button>
                {
                  !isFavorite && 
                <button onClick={onRemoveAndAddFavorites}>{translate("removeItemFromCartAndAddToFavorites", currentLang)}</button>
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default CartModal