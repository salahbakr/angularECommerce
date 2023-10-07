import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartOwner!:any;

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  baseUrl:string = "https://ecommerce.routemisr.com";

  myHeaders:any = {
    token: localStorage.getItem('token')
  }

  constructor(private _HttpClient:HttpClient) { }

  getCart():Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/cart`,
      {
        headers: this.myHeaders,
      }
    );
  }

  addItemToCart(id:string):Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/cart`, 
      {
        "productId": id,
      },
      {
        headers: this.myHeaders
      }
    );
  }

  updateCartItem(id:string, count:number):Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/cart/${id}`,
      {
        "count": count,
      },
      {
        headers: this.myHeaders,
      }
      );
  }

  deleteCartItem(id:string):Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/api/v1/cart/${id}`,
      {
        headers: this.myHeaders
      }
      );
  }

  deleteCart():Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,
      {
        headers: this.myHeaders,
      }
    );
  }
}
