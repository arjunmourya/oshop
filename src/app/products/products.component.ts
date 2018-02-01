import { Component, OnInit,OnDestroy,OnChanges,AfterViewChecked } from '@angular/core';
import { ProductService } from './../product.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './../models/product';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];  
  category: string;
  cart;
  items;
  sub:Subscription;
  constructor(private route: ActivatedRoute, private productSvc: ProductService,private cartSvc:ShoppingCartService) {

    this.productSvc.getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }).subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;

      });

    
  }

  async ngOnInit() {
    await this.cartSvc.getCart().then(cart => {
      this.cart = cart;
      this.cartSvc.getAllItems(this.cart.cartId).subscribe(cartitems => {
        this.items = cartitems;
        
      });
    });
  }

  // async ngAfterViewChecked(){
  //   await this.cartSvc.getCart().then(cart => {
  //     this.cart = cart;
  //     this.cartSvc.getAllItems(this.cart.cartId).then(items => {
  //       this.items = items;
  //     });
  //   });
  // }

  ngOnDestroy(){
    
  }

}
