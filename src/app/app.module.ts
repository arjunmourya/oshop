import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { Angular2SocialLoginModule } from "angular2-social-login";
import { Angular2SocialLoginModule } from "./services/angular2socialloginmodule.module";
import {CustomFormsModule} from 'ng2-validation';
import { DataTableModule } from './data-table';


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
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ProductFilterPipe } from './common/product-filter.pipe';




let providers = {
  "google": {
    "clientId": "<your_clientId_on_google>..apps.googleusercontent.com"    
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
    LoginComponent,
    ProductFormComponent,
    ProductFilterPipe  

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,    
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
      
      
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},            
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]},
    ])
  ],
  providers: [SharedService,AuthGuard,UserService,AdminAuthGuard,CategoryService,ProductService],     

  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
