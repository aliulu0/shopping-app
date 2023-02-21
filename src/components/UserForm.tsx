import React from 'react'
import { useFormik } from 'formik'
import { AddressSchema } from '../helpers/validation';
import styles from '../styles/UserForm.module.scss';
import { addAddress } from '../redux/addressSlice';
import { useAppDispatch } from '../redux/store';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';
import { useSelector } from 'react-redux';
import { isDarkMode } from '../redux/themeSlice';

const UserForm = () => {

    const currentLang = useSelector(language);
    const dispatch = useAppDispatch();
    const isDark = useSelector(isDarkMode);

    const { handleSubmit, handleChange, values, errors, touched, handleBlur, handleReset } = useFormik({
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
            handleReset(values);
        },
        validationSchema: AddressSchema,

    });
    return (
        <div className={`${styles.formContainer} ${isDark ? styles.dark : styles.light}`}>
            <div>
                <form onSubmit={handleSubmit} className={styles.form}>
                <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={`${translate("name",currentLang)}`}
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name && <div className={styles.error}>{errors.name}</div>}
                    <input
                        id="surname"
                        name="surname"
                        type="text"
                        placeholder={`${translate("surname",currentLang)}`}
                        onChange={handleChange}
                        value={values.surname}
                        onBlur={handleBlur}
                    />
                    {errors.surname && touched.surname && <div className={styles.error}>{errors.surname}</div>}
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder={`${translate("phone",currentLang)}`}
                        onChange={handleChange}
                        value={values.phone}
                        onBlur={handleBlur}
                    />
                    {errors.phone && touched.phone && <div className={styles.error}>{errors.phone}</div>}
                    <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder={`${translate("city",currentLang)}`}
                        onChange={handleChange}
                        value={values.city}
                        onBlur={handleBlur}
                    />
                    {errors.city && touched.city && <div className={styles.error}>{errors.city}</div>}
                    <input
                        id="district"
                        name="district"
                        type="text"
                        placeholder={`${translate("district",currentLang)}`}
                        onChange={handleChange}
                        value={values.district}
                        onBlur={handleBlur}
                    />
                    {errors.district && touched.district && <div className={styles.error}>{errors.district}</div>}
                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder={`${translate("address",currentLang)}`}
                        onChange={handleChange}
                        value={values.address}
                        onBlur={handleBlur}
                    />
                    {errors.address && touched.address && <div className={styles.error}>{errors.address}</div>}
                    <input
                        id="doorNumber"
                        name="doorNumber"
                        type="text"
                        placeholder={`${translate("doorNumber",currentLang)}`}
                        onChange={handleChange}
                        value={values.doorNumber}
                        onBlur={handleBlur}
                    />
                    {errors.doorNumber && touched.doorNumber && <div className={styles.error}>{errors.doorNumber}</div>}
                    <button type="submit">{translate("submit",currentLang)}</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm