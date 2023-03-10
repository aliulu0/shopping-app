import React, { useState, useRef, useEffect, useCallback } from 'react'
import slideImg1 from "../assets/images/slide1.jpg"
import slideImg2 from "../assets/images/slide2.jpg"
import slideImg3 from "../assets/images/slide3.jpg"
import styles from '../styles/Slider.module.scss';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import {isDarkMode} from '../redux/themeSlice';
import { useSelector } from 'react-redux';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';

const Slider = () => {
    const isDark = useSelector(isDarkMode);
    const timeRef:React.MutableRefObject<null> | React.MutableRefObject<any> = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  const currentLang = useSelector(language);

    const slides = [
        {
            img: slideImg1,
            title: `${translate("slide1Text", currentLang)}`
        },
        {
            img: slideImg2,
            title: `${translate("slide2Text", currentLang)}`
        },
        {
            img: slideImg3,
            title: `${translate("slide3Text", currentLang)}`
        }
    ]
    // previous slide
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // next slide
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    },[currentIndex, slides.length])

    // selected slide
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex)
    }

    useEffect(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            goToNext();
        }, 3000);
    
      return () => clearTimeout(timeRef.current);
    }, [goToNext])
    

    return (
        <div className={`${styles.sliderContainer} ${isDark ? styles.dark : styles.light}`}>
            <div className={styles.sliderContent}>
                <div>
                    <div className={styles.sliderLeftArrow} onClick={goToPrevious}><MdOutlineArrowBackIosNew /></div>
                    <div className={styles.sliderRightArrow} onClick={goToNext}><MdOutlineArrowForwardIos /></div>
                </div>
                <div className={styles.slide} style={{ backgroundImage: `url(${slides[currentIndex].img})` }}>
                    <h2>{slides[currentIndex].title}</h2>
                </div>
                <div className={styles.sliderDotContainer}>
                    {
                        slides.map((slide, slideIndex) => (
                            <button key={slideIndex} className={styles.sliderDot} onClick={() => goToSlide(slideIndex)}>
                                    
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(Slider);