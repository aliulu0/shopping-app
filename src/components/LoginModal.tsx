import React from 'react'
import styles from './../styles/LoginModal.module.scss';
import { FaTimes } from 'react-icons/fa'

interface Props{
  show : (text:string) => void;
  modalType:string;
}

const UserModal: React.FC<Props> = ({show,modalType}) => {
  return (
    <div className={styles.modalContainer}>
      <button className={styles.modalCloseBtn} onClick={()=> show("")}>
            <FaTimes />
          </button>
        <div className={styles.modalContent}>
            {modalType === "login" ? 
            <form className={styles.formContainer}>
              <input type="text" placeholder='username' />
              <input type="text" placeholder='password' />
              <button>Login</button>

            </form> : <div></div>}
        </div>
    </div>
  )
}

export default UserModal