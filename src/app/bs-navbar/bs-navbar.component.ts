import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
//import { AuthService } from "angular2-social-login";
import { AuthService } from "./../services/google-login.service";
import { Router } from '@angular/router';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnChanges, OnDestroy {

  username: string = '[NAME]';
  sub: any;
  constructor(public _auth: AuthService, private router: Router, private _sharedService: SharedService) {
    //this.username=localStorage.getItem('username');

  }

  ngOnInit() {
    this._sharedService.changeEmitted$.subscribe(
      text => {
        console.log(text);
        this.username = text;
      });
  }

  logout() {

    this.sub = this._auth.logout().subscribe(
      (data) => {
        console.log(data);
        this.username = '[NAME]';
        this.router.navigate(['/login']);
      }
    )
  }

  ngOnChanges() {
    this._sharedService.changeEmitted$.subscribe(
      text => {
        console.log(text);
        this.username = text;
      });
  }

  ngOnDestroy() {
    this.sub = null;
  }


}
