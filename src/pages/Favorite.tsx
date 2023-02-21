import React from 'react'
import { useSelector } from 'react-redux';
import { getAllFavorites } from '../redux/favoriteSlice';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Favorite.module.scss';
import Navbar from '../components/Navbar';
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {isDarkMode} from '../redux/themeSlice';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';
const Favorite = () => {
    const favorites = useSelector(getAllFavorites);
    const router = useNavigate();
    const isDark = useSelector(isDarkMode);
    const currentLang = useSelector(language);

    return (
        <div className={`${styles.favoriteContainer} ${isDark ? styles.dark : styles.light}`}>
            <Navbar />
            <h2><FaAngleLeft className={styles.infoIcon} onClick={() => router("/")} />{translate("favoritesHeader", currentLang)}</h2>
            {
                favorites.length === 0 ?
                    <div className={styles.favoriteNullContent}>
                        <h2>{translate("emptyFavorites", currentLang)}</h2>
                    </div> :
                    <div className={styles.favoriteContent}>
                        {
                            favorites.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))
                        }
                    </div>
            }

        </div>
    )
}

export default Favorite