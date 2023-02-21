import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { getProductsInCart, getCartItemsCount, getCartTotalAmount, updateQuantity, removeItemFromCart, clearCart } from '../redux/cartSlice';
import { useAppDispatch } from '../redux/store';
import styles from '../styles/Cart.module.scss';
import { HiPlus, HiMinus } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { FaAngleLeft } from 'react-icons/fa'
import { CartItem } from '../model/types';
import { useNavigate } from 'react-router-dom';
import { isDarkMode } from '../redux/themeSlice';
import { language } from '../redux/languageSlice'
import { translate } from '../locales/index';
import { getIsOpenModal, toggleModal, setIsFavorite } from '../redux/cartModalSlice'
import { addToFavorite, getAllFavorites } from '../redux/favoriteSlice'
import CartModal from '../components/CartModal';

const Cart = () => {
  const carts = useSelector(getProductsInCart);
  const cartItemsCount = useSelector(getCartItemsCount);
  const cartTotalPrice = useSelector(getCartTotalAmount);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const isDark = useSelector(isDarkMode);
  const currentLang = useSelector(language);
  const isOpenModal = useSelector(getIsOpenModal);
  const favorites = useSelector(getAllFavorites);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // update quantity (increase quantity)
  const increaseQuantity = (cartItem: CartItem) => {
    if (cartItem.quantity > cartItem.stock) {
    }
    dispatch(updateQuantity({ productId: cartItem.id, type: "INC" }))
  }

  // update quantity (decrease quantity)
  const decreaseQuantity = (cartItem: CartItem) => {
    if (cartItem?.quantity === 0) {
      handleRemoveItemFromCart(cartItem)
    } else {
      dispatch(updateQuantity({ productId: cartItem.id, type: "DEC" }))
    }
  }
  // clear the cart items
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleRemoveItemFromCart = (cartItem: CartItem) => {
    handleToggleModal();
    setSelectedItem(cartItem);

    // is the item in the favorites?
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

  return (
    <div className={`${styles.cartContainer} ${isDark ? styles.dark : styles.light}`}>
      <Navbar />
      <h2 className={styles.cartInfo}><FaAngleLeft className={styles.infoIcon} onClick={() => router("/")} />{translate("cartHeader", currentLang)} ( {cartItemsCount} )</h2>
      <div className={styles.cartContent}>
        {isOpenModal && <CartModal onClose={handleToggleModal} onRemove={handleRemoveItem} onRemoveAndAddFavorites={handleRemoveItemAndAddFavorites} />}
        {
          cartItemsCount === 0 ?
          <div className={styles.cartItemsCount}>
              <h2>{translate("emptyCart", currentLang)}</h2>
            </div>
            :
            <>
              <div className={styles.cartProductInfo}>
                <div className={styles.cartItemsTitles}>
                  <h3 className={styles.productTitle}>{translate("product", currentLang)}</h3>
                  <h3 className={styles.unitPriceTitle}>{translate("unitPrice", currentLang)}</h3>
                  <h3 className={styles.quantityTitle}>{translate("quantity", currentLang)}</h3>
                  <h3 className={styles.totalPriceTitle}>{translate("totalPrice", currentLang)}</h3>
                </div>
                <div className={styles.cartItems}>
                  {
                    carts?.map((cartItem) => (
                      <div key={cartItem.id} className={styles.cartItem}>
                        <button className={styles.removeItemBtn} onClick={() => handleRemoveItemFromCart(cartItem)}><HiMinus /></button>
                        <div className={styles.cartProduct}>
                          <img src={cartItem.images[0]} alt={cartItem.brand} />
                          <div>
                            <h3>{cartItem.brand}</h3>
                            <p>{cartItem.title}</p>
                          </div>
                        </div>

                        <div className={styles.cartProductPrice}><span><MdAttachMoney /></span>{cartItem.discountedPrice.toFixed(2)}</div>
                        <div className={styles.cartProductQuantity}>
                          <button className={styles.updateCartBtn} onClick={() => decreaseQuantity(cartItem)}><HiMinus /></button>
                          <h3 className={styles.cartProductQuantityCount}>{cartItem.quantity}</h3>
                          <button className={styles.updateCartBtn} onClick={() => increaseQuantity(cartItem)}><HiPlus /></button>
                        </div>
                        <div className={styles.cartProductTotalPrice}><span><MdAttachMoney /></span>{cartItem.totalPrice.toFixed(2)}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={styles.cartSummary}>
                <button className={styles.cartSummaryBtn} onClick={handleClearCart}>{translate("clear", currentLang)}</button>
                <div className={styles.cartChekout}>
                  <div className={styles.total}>
                    <span>{translate("total", currentLang)}</span>
                    <span className={styles.amount}><MdAttachMoney />{cartTotalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button className={styles.cartSummaryBtn}>{translate("checkout", currentLang)}</button>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Cart