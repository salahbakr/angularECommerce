import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit{

  products:Product[] = [];
  categories:Category[] = [];
  wishListedItems:string[] = [];
  category!:any;
  loading:boolean = true;

  constructor(private _DataService:DataService, private _ActivatedRoute:ActivatedRoute, private _CartService:CartService, private _WishListService:WishListService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.category = params.get('id');
      }
    });

    this._WishListService.getWishList().subscribe({
      next: (response) => {
        for(let product of response.data) {
          this.wishListedItems.push(product._id);
        }
      }
    });

    this._DataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });

    this._DataService.getProductsByCategory(this.category).subscribe({
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
