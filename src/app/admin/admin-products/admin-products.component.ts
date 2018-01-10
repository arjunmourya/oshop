import { Component, OnInit,OnChanges,OnDestroy } from '@angular/core';
import {ProductService } from './../../product.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {IProduct} from './../../models/product';
import {DataTableResource} from './../../data-table';

declare const gapi: any;

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnChanges,OnDestroy {

  products:IProduct[];
  listFilter:string;
  subscription:Subscription;
  tableResource:DataTableResource<IProduct>;
  items:IProduct[]=[];
  itemCount:number;
  public auth2: any;
  constructor(private productSvc:ProductService) {    
    this.subscription=this.productSvc.getAll().subscribe((data:IProduct[])=>{
      this.products=data;
      this.initializeTable(data);
    },error=>(this.handleError));    
   }

  private initializeTable(products:IProduct[]){
      this.tableResource=new DataTableResource<IProduct>(products);
      this.tableResource.query({limit:10,offset:0})
        .then(items=>this.items=items);
      this.tableResource.count().then(count=>this.itemCount=count);
  }

  reloadItems(params){
    if(!this.tableResource) return; ///params={limit:10,offset:0};
    this.tableResource.query(params)
        .then(items=>this.items=items);
  }
  
  ngOnInit() {
    this.googleInit();
    this.subscription=this.productSvc.getAll().subscribe((data:IProduct[])=>this.products=data,error=>(this.handleError));
  }

  ngOnChanges(){
    this.subscription=this.productSvc.getAll().subscribe((data:IProduct[])=>this.products=data,error=>(this.handleError));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  handleError(error){
        console.log('inside error');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error')
    }

  filter(query:string){
    let filterdProducts=(query)? 
        this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())): this.products;

    this.initializeTable(filterdProducts);
  }

  googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: "783541848322-fejsuieen9b8n5c9otcdlo7anllbk32o.apps.googleusercontent.com",
        scope: "email"
      });
    });
  }

}
