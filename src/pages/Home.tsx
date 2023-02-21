import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import Slider from '../components/Slider'
import styles from '../styles/Home.module.scss'
import {isDarkMode} from '../redux/themeSlice';
import { useSelector } from 'react-redux';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';

function Home() {
  const isDark = useSelector(isDarkMode);
  const currentLang = useSelector(language);
  const [sortType, setSortType] = useState("default")

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  }
  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light }`}>
        <Navbar/>
        <Slider />
        <div className={styles.content}>
        <div className={styles.sortContainer}>
        <h1>{translate("allProducts", currentLang)}</h1>
        <div className={styles.sort}>
                <label htmlFor="sort-select">{translate("sortBy", currentLang)}: </label>
                <select id="sort-select" value={sortType} onChange={handleSortChange}>
                    <option value="default">{translate("default", currentLang)}</option>
                    <option value="rating">{translate("rating", currentLang)}</option>
                    <option value="priceLow">{translate("priceAsc", currentLang)}</option>
                    <option value="priceHigh">{translate("priceDesc", currentLang)}</option>
                </select>
            </div>
        </div>
          <ProductList sortType={sortType}/>
        </div>
    </div>
  )
}

export default Home