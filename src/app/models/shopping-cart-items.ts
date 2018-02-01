import { Item } from './items';
import { IProduct } from './product';

export class ShoppingCartItem{
    
    constructor(public items:Item[],public products:IProduct[]){

    }
    

    getQuantity(product) {
        let quantity:number=0;
        
        for (let entry of this.items) {
            if (entry.productid == product.productid)
                quantity = entry.quantity;
        }

        // for (var i = 0, len = this.shoppingCart.length; i < len; i++) {
        //   if (this.shoppingCart[i].productid == product.productid){
        //     this.quantity= this.shoppingCart[i].quantity;        
        //   }

        // }
        return quantity;
    }


    get totalItemCount(){
        let count=0;
        for (var i = 0; i < this.items.length; i++) {
        count += this.items[i].quantity;
      }
      return count;
    }
}