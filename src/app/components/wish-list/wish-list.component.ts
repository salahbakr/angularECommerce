import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit{
 
  wishListedItems:Product[] = []
  loading:boolean = true;

  constructor(private _WishListService:WishListService, private _ToastrService:ToastrService) { }
 
  ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
      next: (response) => {
        this.wishListedItems = response.data;
        this.loading = false;
      }
    });
  }

  deleteFromWishList(id:string, btn:HTMLElement, span:HTMLElement) {
    btn.classList.add('loading');
    span.classList.add('hide-text');
    this._WishListService.deleteFromWishList(id).subscribe({
      next: (response) => {
        this.wishListedItems = this.wishListedItems.filter((product) => response.data.includes(product._id));
        btn.classList.remove('loading');
        span.classList.remove('hide-text');
        this._ToastrService.success(response.message, "Wish List");
      }
    });
  }

}
