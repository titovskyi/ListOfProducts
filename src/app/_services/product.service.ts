import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Product} from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getProducts(): Observable<Product[]> | null {
    return this.http.get(`${environment.API.products}`).pipe(
      map((products: []) => products.map((product: Product) => new Product(product.id, product.name)))
    );
  }

  public addProduct(name: string) {
    return this.http.post(`${environment.API.products}`, {productName: name});
  }

  public remove(productId) {
    return this.http.delete(`${environment.API.products}/${productId}`);
  }

}
