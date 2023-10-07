import { Category } from "./category";

export interface Product {
    _id:string;
    imageCover:string;
    category:Category
    title:string;
    price:number;
    ratingsAverage:number;
    description:string;
    images:string[];
}
