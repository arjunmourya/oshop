import { Component, Input,OnDestroy } from '@angular/core';
import {IProduct} from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../shared-service.service';
import { ShoppingCartItem } from './../models/shopping-cart-items';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnDestroy {

  @Input('product') product:IProduct;
  @Input('show-actions') showActions:boolean=true;
  @Input('shopping-cart') shoppingCart:ShoppingCartItem;
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

  //moved to ProductQuantityComponent
  // async removeFromCart(){
  //   //var scItemQuantity:number=0;
  //   this.sub=(await this.cartSvc.removeFromCart(this.product)).subscribe(updatedResult=>{
  //     this.shoppingCart.items=updatedResult.items;
  //     // for (var i = 0; i < this.shoppingCart.items.length; i++) {
  //     //   scItemQuantity += this.shoppingCart.items[i].quantity;
  //     // }
  //     // for (let entry of this.shoppingCart.items) 
  //     //     scItemQuantity = scItemQuantity + entry.quantity;
      
  //     //console.log(scItemQuantity);
  //     this._sharedService.scItemCountChange(updatedResult.totalItemCount);
  //   });
  // }

  //moved as a method in shopping-cart-item.ts
  // getQuantity(){
  //   if(!this.shoppingCart) return 0;
    

  //   for (let entry of this.shoppingCart.items) {     
  //     if(entry.productid==this.product.productid)
  //     this.quantity= entry.quantity;      
  //   }

  //   // for (var i = 0, len = this.shoppingCart.items.length; i < len; i++) {
  //   //   if (this.shoppingCart[i].productid == product.productid){
  //   //     this.quantity= this.shoppingCart[i].quantity;        
  //   //   }
      
  //   // }
  //   return this.quantity;
  // }

  ngOnDestroy(){
    if(this.sub)
    this.sub.unsubscribe();
  }

}
