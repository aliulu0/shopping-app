import React from 'react'
import Navbar from '../components/Navbar';
import styles from '../styles/AccountPage.module.scss';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { getAllAddresses, removeAddress } from '../redux/addressSlice';
import { HiMinus } from 'react-icons/hi'
import UserForm from '../components/UserForm';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';

const AccountPage = () => {
    const router = useNavigate();
    const addresses = useSelector(getAllAddresses);
    const dispatch = useAppDispatch();
  const currentLang = useSelector(language);
    
    // remove address
    const handleRemoveAddress = (id:number) => {
        dispatch(removeAddress({id}));
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <h2 className={styles.addresHeader}><FaAngleLeft className={styles.infoIcon} onClick={() => router("/")} />{translate("accountPageHeader",currentLang)}</h2>
            <div className={styles.content}>
                {
                    addresses.length === 0 ?
                        <div className={styles.addressCount}>
                            <h2>{translate("emptyAccountPage", currentLang)}</h2>
                        </div>
                        :

                        <div className={styles.addresses}>
                            {
                                addresses.map((address) => (
                                    <div className={styles.addressInfo} key={address.id}>
                                        <div className={styles.removeBtn} onClick={() => handleRemoveAddress(address.id)}><span><HiMinus /></span></div>
                                        <div className={styles.addressContent}>
                                            <div className={styles.nameAndPhoneNumber}>
                                                <h4>{address.name} {address.surname}</h4>
                                                <h4>{address.phone}</h4>
                                            </div>
                                            <p className={styles.address}>{address.address}</p>
                                            <h4 className={styles.districtAndCity}>
                                                {address.district} / {address.city}
                                            </h4>
                                            {address.doorNumber && address.doorNumber > 1 && <h4>{translate("doorNo",currentLang)} {address.doorNumber}</h4>}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
                <UserForm />
            </div>
        </div>
    )
}

export default AccountPage