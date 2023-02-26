import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    
    const id = route.paramMap.get("productId");

    if(id) {
      //then we have to fetch details from backend
      return this.productService.getProductDetailsById(id)
             .pipe(
               map(p => this.imageProcessingService.createImages(p))
             );
    } else {
      //return empty product observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() { 
    return {
      productName:"",
      productDescription:"",
      productDiscountedPrice:0,
      productActualPrice:0,
      productImages:[],
    }
  }
}
