import React, { useEffect } from 'react'
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchProductsAsync, getAllProducts, getAllProductsStatus, getError } from '../redux/produtsSlice';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.scss'
const ProductList = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(getAllProducts);
    const status = useSelector(getAllProductsStatus);
    const error = useSelector(getError);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductsAsync())
        }
    }, [dispatch, status])

    if(status === "loading"){
        return <div>Loading...</div>
    }else if(status === "failed"){
        return <div>Error: {error}</div>
    }

    return (
        <div className={styles.productListContainer}>
        { status === "succeeded" &&
        products.map((product) => 
        <ProductCard key={product.id} product={product}/>
        )}
        </div>
    )
}

export default ProductList