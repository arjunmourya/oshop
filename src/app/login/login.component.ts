
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
//import { AuthService } from "angular2-social-login";
import { AuthService } from "./../services/google-login.service";
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../user.service';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {

  //@Output('username') username = new EventEmitter();
  public user;
  userFromDb:any;
  sub: any;
  constructor(public _auth: AuthService, private router: Router, private _sharedService: SharedService,private userService:UserService) {
    
   }

  signIn(provider) {
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        //console.log(data);
        this.user = data;
        //this.username.emit(this.user.email);
        //this._sharedService.emitChange(this.user.email);
        
        //this.userService.saveUser(this.user).subscribe(userFromDb=>this.userFromDb=userFromDb,error=>console.log(error));
        this.userService.saveUser(this.user).subscribe(userFromDb=>{this.userFromDb=userFromDb;this._sharedService.emitChange(userFromDb);},error=>console.log(error));
        
        this.router.navigate(['/']);

      }
    )
            
  }


  get UserName() {
    return this.user.email;
  }

  ngOnDestroy() {
    //this._sharedService.emitChange(this.user.email);
    this.sub = null;
  }




}
