import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { getProductsInCart, getCartItemsCount, getCartTotalAmount, updateQuantity, removeItemFromCart, clearCart } from '../redux/cartSlice';
import { useAppDispatch } from '../redux/store';
import styles from '../styles/Cart.module.scss';
import { HiPlus, HiMinus } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { CartItem } from '../model/types';

const Cart = () => {
  const carts = useSelector(getProductsInCart);
  const cartItemsCount = useSelector(getCartItemsCount);
  const cartTotalPrice = useSelector(getCartTotalAmount);
  const dispatch = useAppDispatch();


  const increaseQuantity = (cartItem:CartItem) => {
    if (cartItem.quantity > cartItem.stock) {
    }
    dispatch(updateQuantity({ productId: cartItem.id, type:"INC" }))
  }
  
  const decreaseQuantity = (cartItem: CartItem) => {
    if (cartItem.quantity && cartItem.quantity <= 1) {
      dispatch(removeItemFromCart({productId:cartItem.id}))
    }else{
      dispatch(updateQuantity({ productId: cartItem.id, type: "DEC" }))
    }
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleRemoveItemFromCart = (id:number) => {
    dispatch(removeItemFromCart({productId: id}));
  }
  return (
    <div className={styles.cartContainer}>
      <Navbar />
      <h2 className={styles.cartInfo}>My Cart ( {cartItemsCount} )</h2>
      <div className={styles.cartContent}>
        {
          cartItemsCount === 0 ?
            <div className={styles.cartItemsCount}>
              <h2>Your cart is currently empty</h2>
            </div>
            :
            <>
              <div className={styles.cartProductInfo}>
                <div className={styles.cartItemsTitles}>
                  <h3 className={styles.productTitle}>Product</h3>
                  <h3 className={styles.unitPriceTitle}>Unit Price</h3>
                  <h3 className={styles.quantityTitle}>Quantity</h3>
                  <h3 className={styles.totalPriceTitle}>Total Price</h3>
                </div>
                <div className={styles.cartItems}>
                  {
                    carts?.map((cartItem) => (
                      <div key={cartItem.id} className={styles.cartItem}>
                        <button className={styles.removeItemBtn} onClick={() => handleRemoveItemFromCart(cartItem.id)}><HiMinus /></button>
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
                <button className={styles.cartSummaryBtn} onClick={handleClearCart}>Clear Cart</button>
                <div className={styles.cartChekout}>
                  <div className={styles.total}>
                    <span>Total</span>
                    <span className={styles.amount}><MdAttachMoney />{cartTotalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button className={styles.cartSummaryBtn}>Check out</button>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Cart