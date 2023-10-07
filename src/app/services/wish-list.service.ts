import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  myHeaders:any = {
    token: localStorage.getItem('token'),
  }

  baseUrl: string = "https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient) { }

  addToWishList(id:string):Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: this.myHeaders,
      }
      );
  }

  getWishList():Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/wishlist`,
      {
        headers: this.myHeaders,
      }
      );
  }

  deleteFromWishList(id:string):Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: this.myHeaders,
      }
      );
  }
}
