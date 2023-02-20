import React from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import Slider from '../components/Slider'
import styles from '../styles/Home.module.scss'
import {isDarkMode} from '../redux/themeSlice';
import { useSelector } from 'react-redux';

function Home() {
  const isDark = useSelector(isDarkMode);

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light }`}>
        <Navbar/>
        <Slider />
        <div className={styles.content}>
        <h1>All Products</h1>
          <ProductList />
        </div>
    </div>
  )
}

export default Home