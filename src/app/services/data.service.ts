import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl:string = "https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient) { }

  getProducts():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`);
  }

  getProductsByCategory(categoryId:string):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?category=${categoryId}`);
  }

  productDetails(id:string):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }

  getCategories():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }

  getAllOrders(cartOwner:any):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${cartOwner}`);
  }

  getBrands():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`);
  }
}