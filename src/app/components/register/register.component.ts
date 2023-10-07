import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  isLoading:boolean = false;

  errorMsg!:string;

  registerForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[\x21-\x7E]{6,}$/)]],
    rePassword: [''],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators:[this.confirmPassword] } as FormControlOptions);

  constructor(private _FormBuilder:FormBuilder, private _AuthService:AuthService, private _Router:Router) { }

  ngOnInit(): void {
    
  }

  confirmPassword(form: FormGroup): void {
    const password = form.get('password');
    const rePassword = form.get('rePassword');

    if(rePassword?.value === '') {
      rePassword?.setErrors({ required:true });
    } 
    else if(password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch:true });
    }

  }

  handleRegister(){
    this.isLoading = true;

    if(this.registerForm.valid){
      this._AuthService.registerForm(this.registerForm.value).subscribe({
        next: (response) => {
          if(response.message === "success"){
            this._Router.navigate(['/login']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }

}
