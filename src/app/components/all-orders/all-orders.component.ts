import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit{

  orders:Order[] = []
  isLoading: boolean = true;
  details: boolean = false;

  constructor(private _DataService:DataService) { }

  ngOnInit(): void {
    this._DataService.getAllOrders(localStorage.getItem('cartOwner')).subscribe({
      next: (response) => {
        this.orders = response;
        this.isLoading = false;
      }
    });
  }

  toggleDetails(itemsDiv:HTMLElement, arrowIcon:HTMLElement) {
    if(!arrowIcon.classList.contains('arrow')) {
      arrowIcon.classList.add('arrow');
      this.details = true;
      itemsDiv.style.opacity = '1';
      itemsDiv.classList.remove('animate-details-back');
      itemsDiv.classList.add('show-details');
      itemsDiv.classList.add('animate-details');
    } else {
      arrowIcon.classList.remove('arrow');
      this.details = false;
      itemsDiv.style.opacity = '0';
      itemsDiv.classList.add('hide-details');
      itemsDiv.classList.remove('animate-details');
      itemsDiv.classList.remove('show-details');
      itemsDiv.classList.add('animate-details-back');
    }
  }
}
