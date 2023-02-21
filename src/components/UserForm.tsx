import React from 'react'
import { useFormik } from 'formik'
import { AddressSchema } from '../helpers/validation';
import styles from '../styles/UserForm.module.scss';
import { addAddress } from '../redux/addressSlice';
import { useAppDispatch } from '../redux/store';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';
import { useSelector } from 'react-redux';

const UserForm = () => {


    const dispatch = useAppDispatch();
  const currentLang = useSelector(language);

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            city: '',
            district: '',
            address: '',
            name: '',
            surname: '',
            phone: "",
            doorNumber: "",
        },
        onSubmit: values => {
            // add address
            dispatch(addAddress(values));
        },
        validationSchema: AddressSchema,

    });
    return (
        <div className={styles.formContainer}>
            <div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder={`${translate("city",currentLang)}`}
                        onChange={handleChange}
                        value={values.city}
                    />
                    {errors.city && <div className={styles.error}>{errors.city}</div>}
                    <input
                        id="district"
                        name="district"
                        type="text"
                        placeholder={`${translate("district",currentLang)}`}
                        onChange={handleChange}
                        value={values.district}
                    />
                    {errors.district && <div className={styles.error}>{errors.district}</div>}
                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder={`${translate("address",currentLang)}`}
                        onChange={handleChange}
                        value={values.address}
                    />
                    {errors.address && <div className={styles.error}>{errors.address}</div>}
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={`${translate("name",currentLang)}`}
                        onChange={handleChange}
                        value={values.name}
                    />
                    {errors.name && <div className={styles.error}>{errors.name}</div>}
                    <input
                        id="surname"
                        name="surname"
                        type="text"
                        placeholder={`${translate("surname",currentLang)}`}
                        onChange={handleChange}
                        value={values.surname}
                    />
                    {errors.surname && <div className={styles.error}>{errors.surname}</div>}
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder={`${translate("phone",currentLang)}`}
                        onChange={handleChange}
                        value={values.phone}
                    />
                    {errors.phone && <div className={styles.error}>{errors.phone}</div>}
                    <input
                        id="doorNumber"
                        name="doorNumber"
                        type="text"
                        placeholder={`${translate("doorNumber",currentLang)}`}
                        onChange={handleChange}
                        value={values.doorNumber}
                    />
                    {errors.doorNumber && <div className={styles.error}>{errors.doorNumber}</div>}
                    <button type="submit">{translate("submit",currentLang)}</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm