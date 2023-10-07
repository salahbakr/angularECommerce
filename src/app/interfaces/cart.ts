import { Product } from "./product";

export interface Cart {
    cartOwner:string;
    products:CartItemDetails[];
    totalCartPrice:number;
    _id:string;
}

export interface CartItemDetails {
    count:number;
    price:number;
    product:Product;
}