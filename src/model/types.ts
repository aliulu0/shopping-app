export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating:number;
    stock:number;
    brand:string;
    category:string;
    thumbnail:string;
    images: string[];
    discountedPrice:number;
}
export interface ProductsState {
    products: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }

  export interface CartItem extends Product {
    quantity:number;
    totalPrice:number;
  }
 export interface CartState {
    carts: CartItem[];
    itemsCount:number;
    totalAmount:number;
}