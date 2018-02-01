import { Component, OnInit,Input } from '@angular/core';
import { CategoryService } from './../../category.service';

@Component({
  selector: 'product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit {

  @Input('category') category;
  categories$;
  constructor(private categorySvc: CategoryService) { 
    this.categories$ = this.categorySvc.getAll();
  }

  ngOnInit() {
  }

}
