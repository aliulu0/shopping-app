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
    cart: CartItem[];
    itemsCount:number;
    totalAmount:number;
}

export interface FavoriteState{
    favorites: Product[];
}

export interface ThemeState{
  isDarkMode:boolean;
}
export interface LanguageState{
  language:string;
}
export interface filterState{
  filterText:string;
}

export interface modalState{
  isOpenModal: boolean;
  isFavorite:boolean;
}

export interface Address {
  id:number;
  city: string;
  district: string;
  address: string;
  name: string;
  surname: string;
  phone: number;
  doorNumber?: number;
}
export interface AddressState{
  addresses:Address[];
}
export interface AddressFormValues{
  city: string;
  district: string;
  address: string;
  name: string;
  surname: string;
  phone: number;
  doorNumber?: number;
}