import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';

const routes: Routes = [

  {path:'', canActivate: [authGuard], component: BlankLayoutComponent, children:[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'Home' },
    { path: 'products', canActivate: [authGuard], component: ProductsComponent, title: 'Products' },
    { path: 'details/:id', canActivate: [authGuard], component: DetailsComponent, title: 'Details' },
    { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'Cart' },
    { path: 'categories', canActivate: [authGuard], component: CategoriesComponent, title: 'Categories' },
    { path: 'category/:id', canActivate: [authGuard], component: CategoryDetailsComponent, title: 'Category Details' },
    { path: 'brands', canActivate: [authGuard], component: BrandsComponent, title: 'Brands' },
    { path: 'payment/cartId/:id/cartOwner/:ownerId', canActivate: [authGuard], component: PaymentComponent, title: 'Online Payment' },
    { path: 'allorders', canActivate: [authGuard], component: AllOrdersComponent, title: 'Orders' },
    { path: 'wishlist', canActivate: [authGuard], component: WishListComponent, title: 'Wish List' }
  ]},

  {path:'', component: AuthLayoutComponent, children:[
    { path: '', redirectTo: 'home-guest', pathMatch: 'full' },
    { path: 'home-guest', component: HomeComponent, title: 'Home' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'password-reset', component: ForgetPasswordComponent, title: 'Password Reset' }
  ]},

  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
