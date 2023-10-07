import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productsData:Product[] = [];
  categories:Category[] = [];
  wishListedItems:string[] = [];
  searchTerm:string = '';
  isLoading:boolean = true;

  constructor(
    private _dataService: DataService,
    private _CartService:CartService,
    private _WishListService:WishListService,
    private _ToastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
      next: (response) => {
        for(let product of response.data) {
          this.wishListedItems.push(product._id);
        }
      }
    });

    this._dataService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      }
    });

    this._dataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
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

  catSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    nav: true
  }
}
