import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/interfaces/brand';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{

  brands:Brand[] = [];
  loading:boolean = true;

  constructor(private _DataService:DataService) { }

  ngOnInit(): void {
    this._DataService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        this.loading = false;
      }
    });
  }
}
