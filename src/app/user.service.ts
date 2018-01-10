import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers,ResponseContentType,RequestMethod,Request } from '@angular/http';
import {IAppUser} from './models/app-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  private baseUrl='http://localhost:65486/api/Values/';
  private userUrl=this.baseUrl+'GetValues';
  private saveUserUrl=this.baseUrl+'SaveUser';
  constructor(private _http:Http) { }

  getUsers(){
        return this._http.get(this.userUrl)
        .map((response:Response)=><IAppUser>response.json())
        //.do(data=>console.log('All '+JSON.stringify(data)))
        .catch(error => Observable.throw(error));
    }


    getUser(id):Observable<IAppUser>{
        return this._http.get(this.baseUrl+'GetValue/'+id)
        .map((response:Response)=><IAppUser>response.json())
        //.do(data=>console.log('All '+JSON.stringify(data)))
        .catch(this.handleError);
    }

    isAdminUser(id):Observable<boolean>{
        return this._http.get(this.baseUrl+'GetValue/'+id)
        .map((response:Response)=><boolean> (response.json() && response.json().isAdmin))
        //.do(data=>console.log('All '+JSON.stringify(data)))
        .catch(this.handleError);
    }

    saveUser(user){
      let postData={userid:user.uid,name:user.name,email:user.email,passwordSalt:'',passwordHash:'',isAdmin:true};
      let body = JSON.stringify(postData);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.post(this.baseUrl+'SaveUser',body,options)
      .map((res:Response)=> res.json())
      .catch(this.handleError);
    }
    handleError(error:Response){
        console.log('inside error');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error')
    }

}
