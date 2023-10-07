import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm:FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[\x21-\x7E]{6,}$/)]]
  });

  isLoading:boolean = false;

  errorMsg!:string;

  constructor(private _AuthService:AuthService, private _FormBuilder:FormBuilder, private _Router:Router) { }

  handleLogin(){
    this.isLoading = true;
    if(this.loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if(response.message === "success") {
            localStorage.setItem('token', response.token);
            this._Router.navigate(['home']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMsg = err.error.message;
          this.isLoading = false
        }
      });
    }
  }

}