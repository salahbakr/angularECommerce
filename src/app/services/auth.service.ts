import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = "https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient) { }

  registerForm(userData:Object):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, userData);
  }

  login(userData:Object):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, userData)
  }

  sendEmail(email:string):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, { email: email });
  }

  verifyResetCode(resetCode:string):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, { resetCode: resetCode });
  }

  updatePassword(email:string, newPassword:string):Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/auth/resetPassword`,
      {
        email: email,
        newPassword: newPassword,
      }
    );
  }

}