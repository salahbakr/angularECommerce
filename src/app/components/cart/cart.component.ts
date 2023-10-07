import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cartItems?:Cart;
  numOfCartItems:number|null = 0;
  isLoading = true;

  constructor(private _CartService:CartService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    if(this.numOfCartItems != null) {
        this._CartService.getCart().subscribe({
          next: (response) => {
            this._CartService.cartOwner = response.data.cartOwner;
            this.cartItems = response.data;
            this.numOfCartItems = response.numOfCartItems;
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
          }
      });
    }
  }

  deleteCartItem(id:string, btn?:HTMLElement, span?:HTMLElement) {
    btn?.classList.add('loading');
    span?.classList.add('hide-text')
    this._CartService.deleteCartItem(id).subscribe({
      next: (response) => {
        this.cartItems = response.data;
        if(response.numOfCartItems === 0) {
          this.numOfCartItems = null;
        } else {
          this.numOfCartItems = response.numOfCartItems;
        }
        btn?.classList.remove('loading');
        span?.classList.remove('hide-text');
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success("Deleted cart item successfully!", "Cart");
      },
      error: (err) => {
        btn?.classList.remove('loading');
        span?.classList.remove('hide-text');
      }
    });
  }

  deleteCart(btn:HTMLElement, span:HTMLElement) {
    btn.classList.add('loading');
    span.classList.add('hide-text')
    this._CartService.deleteCart().subscribe({
      next: (response) => {
        this.cartItems = undefined;
        this.numOfCartItems = null;
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success("Cleared cart", "Cart");
      },
      error: (err) => {
        btn.classList.remove('loading');
        span.classList.remove('hide-text')
      }
    });
  }

  updateQuantity(id:string, count:number, operand:string) {

    if(operand == "increment") {
      count++;
    } else {
      count--;
    }

    if(count >= 1) {
      this._CartService.updateCartItem(id, count).subscribe({
        next: (response) => {
          this.cartItems = response.data;
          this.numOfCartItems = response.numOfCartItems;
          this._CartService.cartNumber.next(response.numOfCartItems);
          this._ToastrService.success("Updated product quantity", "Cart");
        }
      });
    } else {
      this.deleteCartItem(id);
    }

  }
}