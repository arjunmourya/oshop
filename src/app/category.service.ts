import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers,ResponseContentType,RequestMethod,Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CategoryService {

  private baseUrl='http://localhost:65486/api/Values/';
  private categoryUrl='GetCategory';
  constructor(private _http:Http) { }

  getCategory(){
    return this._http.get(this.baseUrl+this.categoryUrl).map((data:Response)=>data.json()).catch(error=>Observable.throw(error.json().error));
  }

}
