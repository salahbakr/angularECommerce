import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  categories:Category[] = [];
  loading:boolean = true;

  constructor(private _DataService:DataService) { }

  ngOnInit(): void {
    this._DataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        this.loading = false;
      }
    }); 
  }
}
