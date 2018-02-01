import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import {ProductService } from './../../product.service';
import { Router,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  products$;
  product={}
  id;
  categories$;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categorySvc:CategoryService,
    private productSvc:ProductService) {
    this.categories$=categorySvc.getAll();

    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productSvc.getProduct(this.id).take(1).subscribe(data=> {this.product=data;},error=>console.log(error.json().error, 'Error'));
   }

  ngOnInit() {
  }

  save(product){
    
    let toastr=require('toastr');
    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 2000;
    toastr.options.fadeOut = 1000;
    toastr.options.fadeIn = 250;

    if (this.id) {
      this.productSvc.updateProduct(product).subscribe(data => { this.products$ = data; toastr.success('Product updated successfully.', 'Update');  },
        error => toastr.error('Error While updating', 'Error'));
    }
    else {
      this.productSvc.saveProduct(product)
      .subscribe(data => { this.products$ = data; toastr.success('Product saved successfully.', 'Save');  },
      error => toastr.error('Error While saving', 'Error'));
    }
    
    this.router.navigate(['/admin/products/']);
  }
  //https://images.pexels.com/photos/373458/pexels-photo-373458.jpeg?w=940&h=650&auto=compress&cs=tinysrgb
    //https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg

  delete(){
    let toastr=require('toastr');
    let t=require('toastr');
    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 2000;
    toastr.options.fadeOut = 1000;
    toastr.options.fadeIn = 250;    
    this.productSvc.deleteProduct(this.id).subscribe(() => toastr.success('Product deleted successfully.', 'Delete'));
    this.router.navigate(['/admin/products/']);
  }

}
