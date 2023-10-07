import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl:string = "https://ecommerce.routemisr.com";

  myHeaders:any = {
    token: localStorage.getItem('token')
  }

  constructor(private _HtppClient:HttpClient) { }

  checkOutSession(details:Object, cartId:string|null):Observable<any> {
    return this._HtppClient.post(
      `${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://salahbakr.github.io`,
      {
        shippingAddress: details,
      },
      {
        headers: this.myHeaders,
      }
      );
  }
}