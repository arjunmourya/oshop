import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  //@Output('username') username = new EventEmitter();
  public user;
  sub: any;
  constructor(public _auth: AuthService, private router:Router,private _sharedService: SharedService){ }

  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        //console.log(data);
        this.user=data;
        //this.username.emit(this.user.email);
        this._sharedService.emitChange(this.user.email);
        //localStorage.setItem('username',this.user.email);
        this.router.navigate(['/shopping-cart']);
      }
    )
  }

  

}
