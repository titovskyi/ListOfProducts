import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../_models/product';
import {ProductService} from '../../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  @ViewChild('productName', {static: false}) productName: ElementRef;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  // public addProduct() {
  //   this.productService.addProduct(this.productName.nativeElement.value).subscribe((res: Product[]) => {
  //     this.products = res;
  //   });
  // }

  public removeProduct(id) {
    this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
