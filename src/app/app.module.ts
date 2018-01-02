import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { Angular2SocialLoginModule } from "angular2-social-login";
import { Angular2SocialLoginModule } from "./services/angular2socialloginmodule.module";

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessfulComponent } from './order-successful/order-successful.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared-service.service';
import { AuthGuard } from './auth-guard.service';
import {UserService} from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';



let providers = {
  "google": {
    "clientId": "783541848322-fejsuieen9b8n5c9otcdlo7anllbk32o.apps.googleusercontent.com"
  }
  // ,
  // "linkedin": {
  //   "clientId": "LINKEDIN_CLIENT_ID"
  // },
  // "facebook": {
  //   "clientId": "FACEBOOK_CLIENT_ID",
  //   "apiVersion": "v2.4"
  // }
};


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessfulComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent  

  ],
  imports: [
    BrowserModule,
    HttpModule,
    Angular2SocialLoginModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'login',component:LoginComponent},

      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:'order-success',component:OrderSuccessfulComponent,canActivate:[AuthGuard]},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuard]},
      
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]},
    ])
  ],
  providers: [SharedService,AuthGuard,UserService,AdminAuthGuard],     

  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
