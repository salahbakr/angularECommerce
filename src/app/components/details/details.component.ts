import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  productId!:any;
  productDetails:any;
  wishListedItems:string[] = [];
  products:Product[] = [];
  category:string = '';
  searchTerm:string = '';
  loading:boolean = true;

  constructor(
    private _DataService:DataService,
    private _WishListService:WishListService,
    private _ToastrService:ToastrService,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private _Router:Router) 
    { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.loading = true;
        this.productId = params.get('id');
        this.getWishList();
        this._DataService.productDetails(this.productId).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            this._DataService.getProductsByCategory(response.data.category._id).subscribe({
              next: (response) => {
                this.products = response.data;
                this.loading = false;
              }
            });
          },
        });
      }
    });
    
  }

  getWishList():void {
    this._WishListService.getWishList().subscribe({
      next: (response) => {
        for(let product of response.data) {
          this.wishListedItems.push(product._id);
        }
      }
    });
  }

  addProductToCart(id:any, btn:HTMLElement, span:HTMLElement) {
    btn.classList.add('loading');
    span.classList.add('hide-text');
    this._CartService.addItemToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
      },
    });
  }

  addProductToWishList(id:any, heartIcon:HTMLElement) {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        heartIcon.style.color = 'red';
        this.wishListedItems = response.data;
        this._ToastrService.success(response.message, "Wish List");
      }
    });
  }

  deleteProductFromWishList(id:any, heartIcon:HTMLElement) {
    this._WishListService.deleteFromWishList(id).subscribe({
      next: (response) => {
        heartIcon.style.color = '';
        this.wishListedItems = response.data;
        this._ToastrService.success(response.message, "Wish List");
      }
    });
  }

  changeRoute(productId:string) {
    this._Router.navigate(['/details', productId], { relativeTo: this._ActivatedRoute });
    this.ngOnInit();
  }

  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Next', 'Prev'],
    items: 1,
    autoplay: true,
    nav: false
  }
}
