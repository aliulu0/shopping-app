import React from 'react'
import styles from '../styles/Dropdown.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  showModal: (text: string) => void;
}
const DropdownProfile: React.FC<Props> = ({ showModal }) => {
    const router = useNavigate();
  return (

    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdownContent}>
        <li className={styles.dropdownItem} onClick={() => showModal("account")}>Account</li>
        <li className={styles.dropdownItemTablet} onClick={() => router("/favorites")}>Favorites</li>
        <li className={styles.dropdownItemTablet} onClick={() => router("/cart")}>Cart</li>
        <li className={styles.dropdownItem}>Language</li>
        <li className={styles.dropdownItem}>Mode</li>
      </ul>
    </div>
  )
}

export default DropdownProfile