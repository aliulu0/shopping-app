import React, { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchProductsAsync, getAllProducts, getAllProductsStatus, getError } from '../redux/produtsSlice';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.scss'
import {getFilterText} from '../redux/filterSlice';

interface Props{
    sortType: string
}

const ProductList:React.FC<Props> = ({sortType}) => {

    const dispatch = useAppDispatch();
    const products = useSelector(getAllProducts);
    const status = useSelector(getAllProductsStatus);
    const error = useSelector(getError);
    const filterText = useSelector(getFilterText);

    const sortedProducts = useMemo(() => {
        switch (sortType) {
          case 'priceLow':
            return [...products].sort((a, b) => a.price - b.price);
          case 'priceHigh':
            return [...products].sort((a, b) => b.price - a.price);
          case 'rating':
            return [...products].sort((a, b) => b.rating - a.rating);
          default:
            return products;
        }
      }, [sortType, products]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductsAsync())
        }
    }, [dispatch, status])
    
    if (status === "loading") {
        return <div>Loading...</div>
    } else if (status === "failed") {
        return <div>Error: {error}</div>
    }
    const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(filterText.toLowerCase()) ||
    product.description.toLowerCase().includes(filterText.toLowerCase())
  );
    return (
        <div className={styles.productListContainer}>
            {status === "succeeded" &&
                filteredProducts.map((product) => {
                    let discountedPrice = product.price - ((product.price * product.discountPercentage) / 100);
                    return (
                        <ProductCard key={product.id} product={{ ...product, discountedPrice }} />
                    )
                })
            }
        </div>
    )
}

export default ProductList