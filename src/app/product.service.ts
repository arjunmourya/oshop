import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers,ResponseContentType,RequestMethod,Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {

  private baseUrl='http://localhost:65486/api/Values/';
  private productSaveUrl='SaveProduct';
  private getAllUrl='GetProducts';
  private getProductUrl='GetProduct';
  private updateProductUrl='UpdateProduct';
  constructor(private _http:Http) { }

  saveProduct(product){
    let body = JSON.stringify(product);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + this.productSaveUrl, product, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);;
  }

  getAll(){
    return this._http.get(this.baseUrl+this.getAllUrl)
    .map((response:Response)=> response.json())
    .catch(this.handleError);
  }

  getProduct(productId){
   return this._http.get(this.baseUrl+this.getProductUrl+'/'+productId)
    .map((response:Response)=> response.json())
    .catch(this.handleError);
  }

  updateProduct(product){
    let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        

        let requestoptions = new RequestOptions({
            method: RequestMethod.Put,
            url: 'http://localhost:65486/api/Values/UpdateProduct/'+product.productid,
            headers: headers,
            body: JSON.stringify(product)
        })

        return this._http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res) {
                    return [{ status: res.status, json: res.json() }]
                }
            })
            .catch(this.handleError);
  }

  deleteProduct(id){
    //this._http.delete('http://localhost:65486/api/Values/'+id)
   return   this._http.delete('http://localhost:65486/api/Values/DeleteProduct/' + id)
    .map((response:Response)=> response.json())
    .catch(this.handleError);

//     let headers = new Headers();
//         headers.append("Content-Type", 'application/json');
        
// alert('http://localhost:65486/api/Values/DeleteProduct/'+id);
//         let requestoptions = new RequestOptions({
//             method: RequestMethod.Delete,
//             url: 'http://localhost:65486/api/Values/DeleteProduct/' + id,
//             headers: headers,
            
//         })

//         return this._http.request(new Request(requestoptions))
//             .map((res: Response) => {
//                 alert('res'+res.json())
//                 if (res) {
//                     return [{ status: res.status, json: res.json() }]
//                 }
//             })
//             .catch(this.handleError);
  }

  handleError(error:Response){
        console.log('inside error');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error')
    }

}
