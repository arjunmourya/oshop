import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers,ResponseContentType,RequestMethod,Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/take';
import { IProduct } from './models/product';
import { Item } from './models/items';
import { ShoppingCartItem } from './models/shopping-cart-items';

@Injectable()
export class ShoppingCartService {

  private baseUrl='http://localhost:65486/api/shoppingcart/';
  private scSaveUrl='create';
  private addItemsToCart='addItemsToCart';
  private getItems='GetCartId';
  private getAllItemsUrl='GetItems';
  private updateItemUrl='UpdateItem/';
  private getShoppingCart='GetShoppingCartId';
  updatedItems:any[];
  constructor(private _http:Http) { }

  private create(){
    let body = {};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + this.scSaveUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);;
  }

  async getCart(){
    let cartId=await this.getOrCreateCartId();
    return this._http.get(this.baseUrl+this.getShoppingCart+'/'+cartId).toPromise()
    .then((response:Response)=> response.json())
    .catch(this.handleError);
  }

  private async getOrCreateCartId(): Promise<string> { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create().toPromise();
    localStorage.setItem('cartId', result.cartId);
    return result.cartId;
  }
  

  public getItem(cartId:string,productid:number){
    return this._http.get(this.baseUrl+this.getItems+'/'+cartId+'/'+productid)
    .map((response:Response)=> response.json())
    .catch(this.handleError);
  }

  public getAllItems(cartId:string):Observable<ShoppingCartItem>{
    //console.log(cartId);
    return this._http.get(this.baseUrl+this.getAllItemsUrl+'/'+cartId)
    .map((response:Response)=> {
      let products=response.json().products;      
      let items=response.json().items;
      return new ShoppingCartItem(items,products);
    })
    .catch(this.handleError);
  }


  async addToCart(product:IProduct){
    return this.updateItemQuantity(product,1);
  }

  async removeFromCart(product:IProduct){
    return this.updateItemQuantity(product,-1) ;
  }

  private async updateItemQuantity(product:IProduct,change:number){
    let cartId = await this.getOrCreateCartId();    
    let added:number;

    if (cartId) {
     return this.fetchAndAddToCart(cartId,product.productid,change);
    } 
  }

  //original method--without "async"
  // addToCart(product:IProduct):number{
    
  //   let cartId=localStorage.getItem('cartId');
  //   let added:number;

  //   if (cartId) {
  //    added= this.fetchAndAddToCart(cartId,product.productid);
  //   } else {

  //     let result = this.create();
  //     result.subscribe(c => {
  //       localStorage.setItem('cartId', c.cartId);
  //       cartId = c.cartId;

  //       if (cartId != null) {
  //        added=this.fetchAndAddToCart(cartId,product.productid);
  //       }
  //     });
  //   }
  //   return added;
  // }

  private fetchAndAddToCart(cartId,productid,change:number){
    let item$ = this.getItem(cartId, productid);
    let finalResult:number;

     return item$.switchMap(data=>{
        if (data == null || data == undefined) {
        return this.addUpdateItem({ productid: productid, cartId: cartId, quantity:  1 }, this.baseUrl + this.addItemsToCart, RequestMethod.Post);
      }
      else {
        return  this.addUpdateItem({ productid: productid, cartId: cartId, quantity: data.quantity + change }, this.baseUrl + this.updateItemUrl + cartId, RequestMethod.Put);
      }
    }).switchMap(second=>{
      return this.getAllItems(cartId);
    })
    //  .subscribe(
    //           updtItems=>{
    //             this.updatedItems=updtItems;
    //             console.log(this.updatedItems);                
              
    //           //finalResult=1;
            
    //       },error=>{
    //         //finalResult=0;
    //       });

      //removing multiple subscribe by using switchMap
      // item$.subscribe(item => {
      //   //let body ={ productid: productid, cartId: cartId, quantity: (item.quantity || 0) + 1 } ;
      //   if (item == null || item == undefined) {
                    
      //     this.addUpdateItem({ productid: productid, cartId: cartId, quantity:  1 }, this.baseUrl + this.addItemsToCart, RequestMethod.Post)
      //       .subscribe(data => {
      //         this.getAllItems(cartId)
      //         .then(updtItems=>{
      //           this.updatedItems=updtItems;
      //           console.log(this.updatedItems);                
      //         });;
      //         //finalResult=1;
            
      //     },error=>{
      //       //finalResult=0;
      //     });
      //   }
      //   else {
      //     this.addUpdateItem({ productid: productid, cartId: cartId, quantity: item.quantity + 1 }, this.baseUrl + this.updateItemUrl + cartId, RequestMethod.Put)
      //       .subscribe(data => {
      //         //finalResult=1;
      //         this.getAllItems(data.cartId)
      //         .then(updtItems=>{
      //           this.updatedItems=updtItems;
      //           console.log(this.updatedItems);                
      //         });
      //       },error=>{
      //         //finalResult=0;
      //       });
      //   }
      // });


      //return finalResult;
      //console.log(this.updatedItems)
      //return this.updatedItems;
  }


  private addUpdateItem(resource,url:string,reqMethod:RequestMethod){
    let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        

        let requestoptions = new RequestOptions({
            method: reqMethod,
            url: url,
            headers: headers,
            body: JSON.stringify(resource)
        })

        return this._http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res) {
                    //return [{ status: res.status, json: res.json() }]
                    return res.json()
                }
            })
            .catch(this.handleError);
  }

  handleError(error:Response){
        console.log('inside error');
        console.error(error);
        return Observable.throw(error || 'Server error')
    }

  private extractData(res:Response) {
      let body = res.json();
      return body || [];
  }  


    

}
