import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent{

  email:string = ''
  resetCode!:string;
  newPassword!:string;
  error!:string;
  phase:number = 1;

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  sendResetCode(email:string, btn:HTMLElement, span:HTMLElement):void {
    btn.classList.add('loading');
    span.classList.add('hide-text');
    this._AuthService.sendEmail(email).subscribe({
      next: (response) => {
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
        this.error = '';
        this.phase = 2;
      },
      error: (err) => {
        this.error = err.error.message;
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
      }
    });
  }

  verifyResetCode(resetCode:string, btn:HTMLElement, span:HTMLElement):void {
    btn.classList.add('loading');
    span.classList.add('hide-text');
    this._AuthService.verifyResetCode(resetCode).subscribe({
      next: (response) => {
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
        this.error = '';
        this.phase = 3;
      },
      error: (err) => {
        this.error = err.error.message;
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
      }
    });
  }

  updatePassword(newPassword:string, btn:HTMLElement, span:HTMLElement):void {
    btn.classList.add('loading');
    span.classList.add('hide-text');
    this._AuthService.updatePassword(this.email, newPassword).subscribe({
      next: (response) => {
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
        localStorage.setItem('token', response.token);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error.message;
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
      }
    });
  }

}
