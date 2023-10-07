import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products:Product[] = [];
  wishListedItems: string[] = [];
  loading:boolean = true;
  searchTerm:string = '';

  constructor(private _DataService:DataService, private _CartService:CartService, private _ToastrService:ToastrService, private _WishListService:WishListService) { }

  ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
      next: (response) => {
        for(let product of response.data) {
          this.wishListedItems.push(product._id);
        }
      }
    });
    
    this._DataService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      }
    });
  }

  addProductToCart(id:string, btn:HTMLElement, span:HTMLElement) {
    btn.classList.add('loading');
    span.classList.add('hide-text');
    this._CartService.addItemToCart(id).subscribe({
      next: (response) => {
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      }
    });
  }

  addProductToWishList(id:string, heartIcon:HTMLElement) {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        heartIcon.style.color = 'red';
        this.wishListedItems = response.data;
        this._ToastrService.success(response.message, "Wish List");
      }
    });
  }

  deleteProductFromWishList(id:string, heartIcon:HTMLElement) {
    this._WishListService.deleteFromWishList(id).subscribe({
      next: (response) => {
        heartIcon.style.color = '';
        this.wishListedItems = response.data;
        this._ToastrService.success(response.message, "Wish List");
      }
    });
  }

}
