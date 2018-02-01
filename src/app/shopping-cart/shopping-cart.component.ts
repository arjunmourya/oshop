import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { SharedService } from './../shared-service.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  user:any;
  userFromDb:any;
  cart$;
  scTotalPrice:number=0;
  constructor(private userService:UserService,private cartSvc:ShoppingCartService,private _sharedService:SharedService) {
    
    //this.userService.saveUser(this.user).subscribe(userFromDb=>{console.log(userFromDb);this.userFromDb=userFromDb;},error=>console.log(error));
    //this.userService.getUser(id).subscribe(data=>this.user=data);
   }

  async ngOnInit() {
    await this.cartSvc.getCart().then(cart => {      
     this.cart$=this.cartSvc.getAllItems(cart.cartId);
      // .subscribe(cartitems => {
      //   this.cart = cartitems.items;
      // });
    });

    //this._sharedService.scItemCountChangeEmitted$.subscribe(data=>this.scTotalItemCount=data);
  }

  private getQuantity(items,productid){
    for (let entry of items) {     
      if(entry.productid==productid)
      return entry.quantity;      
    }
  }

  getPrice(price,quantity){
    
    return price*quantity;
  }

  display(){
    let toastr=require('toastr');
    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
    toastr.success('save');
    //toastr.error('error');
  }

}
