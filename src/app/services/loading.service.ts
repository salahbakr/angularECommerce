import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(value: boolean) {
    this.isLoading.next(value);
  }

  isLoading$ = this.isLoading.asObservable();
}
