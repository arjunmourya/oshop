import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from './../models/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value:IProduct[],args:string):IProduct[]{
       let filter: string = args!=undefined && args ? args.toLowerCase() : null;
        let res= filter ? value.filter((product: IProduct) =>
            product.title.toLowerCase().indexOf(filter) !== -1) : value;
      //let res=  value.filter((item)=> item.productName == args) ;
            
        //console.log(res);
        return res;
  }

}
