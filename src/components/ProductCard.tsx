import React, { useState } from 'react'
import { Product } from '../model/types';
import styles from '../styles/ProductCard.module.scss'
import { BsStarFill } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { HiPlus, HiMinus } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { addToCart, getProductsInCart, updateQuantity, removeItemFromCart } from '../redux/cartSlice';
import { getAllFavorites, addToFavorite, removeFromFavorite } from '../redux/favoriteSlice';
import { getIsOpenModal, toggleModal, setIsFavorite } from '../redux/cartModalSlice'
import CartModal from './CartModal';
interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {

  const dispatch = useAppDispatch();
  const carts = useSelector(getProductsInCart);
  const existingItemInCart = carts.find(item => item.id === product.id);
  const [quantity, setQuantity] = useState(existingItemInCart?.quantity || 1);
  const favorites = useSelector(getAllFavorites);
  const existingItemInFavorites = favorites.find((item) => item.id === product.id);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const isOpenModal = useSelector(getIsOpenModal);

  // add item to cart
  const handleAddToCart = (product: Product) => {
    let totalPrice = quantity * product.discountedPrice;
    dispatch(addToCart({ ...product, quantity: 1, totalPrice }))
    setQuantity(1);
  }

  // update quantity (increase quantity)
  const increaseQuantity = (productId: number) => {
    setQuantity(quantity + 1);
    if (quantity > product.stock) {
      setQuantity(product.stock);
    }
    dispatch(updateQuantity({ productId, type: "INC" }))
  }

  // update quantity (decrease quantity)
  const decreaseQuantity = (product: Product) => {
    if (existingItemInCart && existingItemInCart.quantity === 0) {
      handleRemoveItemFromCart(product);
    } else {
      setQuantity(quantity - 1);
      dispatch(updateQuantity({ productId: product.id, type: "DEC" }))
    }
  }
  // is the item in the favorites?
  const handleRemoveItemFromCart = (cartItem: Product) => {
    handleToggleModal();
    setSelectedItem(cartItem);
    dispatch(setIsFavorite({ favorites, productId: cartItem.id }));
  }
  // remove item from cart
  const handleRemoveItem = () => {
    dispatch(removeItemFromCart({ productId: selectedItem?.id }));
    handleToggleModal();
  }
  // remove item from cart and add to favorites
  const handleRemoveItemAndAddFavorites = () => {
    dispatch(addToFavorite(selectedItem));
    dispatch(removeItemFromCart({ productId: selectedItem?.id }));
    handleToggleModal();
  }

  // toggle modal
  const handleToggleModal = () => {
    dispatch(toggleModal());
  }

  const handleToggleFavorite = (product: Product) => {
    if (!existingItemInFavorites) {
      // add product to favorites
      dispatch(addToFavorite(product));
    } else {
      // delete product from favorites
      dispatch(removeFromFavorite({ productId: product.id }))
    }
  }

  return (
    <>
    {isOpenModal && <CartModal onClose={handleToggleModal} onRemove={handleRemoveItem} onRemoveAndAddFavorites={handleRemoveItemAndAddFavorites} />}
      <div className={styles.productContainer}>
        <div className={styles.favoriteIcon} onClick={() => handleToggleFavorite(product)}>{!existingItemInFavorites ? <span><FiHeart className={styles.favoriteOutlineIcon} /></span> : <span><FaHeart className={styles.favoriteFillcon} /></span>}</div>
        <p className={styles.productCategory}>{product.category}</p>
        <img className={styles.productImg} src={product?.images[0]} alt="product" />
        <div className={styles.productInfo}>
          <p><span>{product.brand}</span>{product.title}</p>
          <h3 className={styles.rating}><span className={styles.ratingIcon}><BsStarFill /></span>{product.rating.toFixed(1)}</h3>
          <div className={styles.productPrices}>
            <h5 className={styles.oldPrice}><MdAttachMoney />{product.price}</h5>
            <h4 className={styles.newPrice}><MdAttachMoney />{product.discountedPrice.toFixed(2)}</h4>
          </div>
        </div>
        {
          existingItemInCart ?
            <div className={styles.updateCartContainer}>
              <button className={styles.updateCartBtn} onClick={() => decreaseQuantity(product)}><HiMinus /></button>
              <h3>{quantity}</h3>
              <button className={styles.updateCartBtn} onClick={() => increaseQuantity(product.id)}><HiPlus /></button>
            </div>
            :
            <button className={styles.productCartBtn}
              onClick={() => handleAddToCart(product)}
            >
              <span><FaShoppingCart /></span> Add Cart
            </button>
        }
      </div>
    </>
  )
}

export default ProductCard;