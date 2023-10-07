import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cartId!:string|null;
  isLoading: boolean = false;

  checkForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required]]
  });

  constructor(private _FormBuilder:FormBuilder,
     private _ActivatedRoute:ActivatedRoute,
     private _PaymentService:PaymentService) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        const ownerId = params.get('ownerId') || '';
        localStorage.setItem('cartOwner', ownerId);
      }
    });
  }

  handleForm() {
    this.isLoading = true;
    if(this.checkForm.valid) {
      this._PaymentService.checkOutSession(this.checkForm.value, this.cartId).subscribe({
        next: (response) => {
          window.open(response.session.url, "_self");
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        }
      });
    }
  }

}