import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.scss'
function Home() {
  return (
    <div className={styles.container}>
        <Navbar/>
    </div>
  )
}

export default Home