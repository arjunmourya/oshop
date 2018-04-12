import { IProduct } from './product';

export class Item{
    productid:number;
    cartId:string;
    quantity:number;
    product:IProduct; //Each item will have a detail about its product

    constructor(){
        
    }

    gettotalPrice(product,quantity){
        debugger;
        return (product.price * quantity);
    }
}