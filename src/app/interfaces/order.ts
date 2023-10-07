import { CartItemDetails } from "./cart";

export interface Order {
    cartItems:CartItemDetails[];
    createdAt:Date;
    isDelivered:boolean;
    isPaid:boolean;
    shippingAddress:address;
    totalOrderPrice:number;
    paymentMethodType:string;
}

interface address {
    details:string;
    city:string;
    phone:string;
}