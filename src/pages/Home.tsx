import React from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import Slider from '../components/Slider'
import styles from '../styles/Home.module.scss'
function Home() {
  return (
    <div className={styles.container}>
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