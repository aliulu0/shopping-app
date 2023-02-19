import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import styles from '../styles/Home.module.scss'
function Home() {
  return (
    <div className={styles.container}>
        <Navbar/>
        <Slider />
        
    </div>
  )
}

export default Home