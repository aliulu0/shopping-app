import React from 'react'
import styles from './../styles/CartModal.module.scss';
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import {getIsFavorite} from '../redux/cartModalSlice'
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';

interface Props{
  onClose : () => void;
  onRemove:() => void;
  onRemoveAndAddFavorites:() => void;
}
const UserModal: React.FC<Props> = ({onClose, onRemove,onRemoveAndAddFavorites}) => {
  const isFavorite = useSelector(getIsFavorite);
  const currentLang = useSelector(language);
  return (
    <div className={styles.modalContainer}>
      <button className={styles.modalCloseBtn} onClick={onClose}>
            <FaTimes />
          </button>
        <div className={styles.modalContent}>
            <div className={styles.cartConfirm}>
              <h3 className={styles.cartConfirmHeader}>Are you sure you want to remove the item from the cart?</h3>
              <div className={styles.cartConfirmBtnContainer}>
                <button onClick={onRemove}>Remove the product from the cart</button>
                {
                  !isFavorite && 
                <button onClick={onRemoveAndAddFavorites}>Remove the product from the cart & add to favorite.</button>
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default UserModal