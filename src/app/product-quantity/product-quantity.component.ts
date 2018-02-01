import { Component, OnInit,OnDestroy,Input } from '@angular/core';
import {IProduct} from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../shared-service.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnDestroy {

  @Input('product') product:IProduct;
  
  @Input('shopping-cart') shoppingCart;
  items:any[];
  quantity:number=0;
  sub:Subscription;
  constructor(private cartSvc:ShoppingCartService,private _sharedService:SharedService) {
    
   }

  async addToCart()  {
    
    let toastr=require('toastr');
    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 2000;
    toastr.options.fadeOut = 1000;
    toastr.options.fadeIn = 250;

    //var scItemQuantity:number=0;

    this.sub=(await this.cartSvc.addToCart(this.product)).subscribe(updatedResult=>{
      this.shoppingCart.items=updatedResult.items;
      // for (var i = 0; i < this.shoppingCart.length; i++) {
      //   scItemQuantity += this.shoppingCart[i].quantity;
      // }
      // for (let entry of this.shoppingCart) 
      //     scItemQuantity = scItemQuantity + entry.quantity;
      
      //console.log(scItemQuantity);
      this._sharedService.scItemCountChange(updatedResult.totalItemCount);
    });
    
    //console.log(items);
    // this.cartSvc.getAllItems(cartId).then(items => {
    //     this.shoppingCart = items;
    //   });
    
  }

  async removeFromCart(){
    //var scItemQuantity:number=0;
    this.sub=(await this.cartSvc.removeFromCart(this.product)).subscribe(updatedResult=>{
      this.shoppingCart.items=updatedResult.items;
      // for (var i = 0; i < this.shoppingCart.length; i++) {
      //   scItemQuantity += this.shoppingCart[i].quantity;
      // }
      // for (let entry of this.shoppingCart) 
      //     scItemQuantity = scItemQuantity + entry.quantity;
      
      //console.log(scItemQuantity);
      this._sharedService.scItemCountChange(updatedResult.totalItemCount);
    });
  }  
  

  ngOnDestroy(){
    if(this.sub)
    this.sub.unsubscribe();
  }

}
