import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit{

  cartNumber:number = 0;

  constructor(private _Router:Router, private _CartService:CartService) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
      }
    });
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNumber = data;
      }
    });
  }

  signOut() {
    this._Router.navigate(['login']);
    localStorage.removeItem('token');
  }

}
