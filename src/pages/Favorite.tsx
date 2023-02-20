import React from 'react'
import { useSelector } from 'react-redux';
import { getAllFavorites } from '../redux/favoriteSlice';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Favorite.module.scss';
import Navbar from '../components/Navbar';
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
    const favorites = useSelector(getAllFavorites);
    const router = useNavigate();

    return (
        <div className={styles.favoriteContainer}>
            <Navbar />
            <h2><FaAngleLeft className={styles.infoIcon} onClick={() => router("/")} />Favorites</h2>
            {
                favorites.length === 0 ?
                    <div className={styles.favoriteNullContent}>
                        <h2>Your favorites is currently empty</h2>
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