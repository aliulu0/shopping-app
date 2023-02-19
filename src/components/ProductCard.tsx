import React from 'react'
import {Product} from '../model/types';
import styles from '../styles/ProductCard.module.scss'
import {BsStarFill} from 'react-icons/bs'
import {FiHeart} from 'react-icons/fi'
interface Props{
    product: Product;
}
const ProductCard:React.FC<Props> = ({product}) => {
  const discountedPrice = product.price - ((product.price * product.discountPercentage) / 100);
  return (
    <div className={styles.productContainer}>
      <div className={styles.productIcon}><span><FiHeart/></span></div>
      <img className={styles.productImg} src={product?.images[0]} alt="product" />
      <div className={styles.productInfo}>
        <p><span>{product.brand}</span>{product.title}</p>
        <h3 className={styles.rating}><span className={styles.ratingIcon}><BsStarFill/></span>{product.rating.toFixed(1)}</h3>
        <div className={styles.productPrices}>
        <h5 className={styles.oldPrice}>$ {product.price}</h5>
        <h4 className={styles.newPrice}>$ {discountedPrice.toFixed(2)}</h4>
        </div>
      </div>
      <button className={styles.productCartBtn}>Add Cart</button>
    </div>
  )
}

export default ProductCard;