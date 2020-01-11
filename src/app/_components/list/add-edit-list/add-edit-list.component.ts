import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ListService} from '../../../_services/list.service';
import {ProductService} from '../../../_services/product.service';
import {Product} from '../../../_models/product';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CategoryService} from '../../../_services/category.service';
import {Category} from '../../../_models/category';

@Component({
  selector: 'app-list-form',
  templateUrl: './add-edit-list.component.html',
  styleUrls: ['./add-edit-list.component.scss']
})
export class AddEditListComponent implements OnInit {

  commonListName: string = new Date().toDateString();

  products: Product[] = [];

  userProducts: Product[] = [];

  userCategories: Category[] = [];

  productForm: FormGroup;

  listName = new FormControl('');

  productName = new FormControl('');

  categoryName = new FormControl('');

  currentCategory: any = null;

  filteredProducts: Observable<Product[]>;

  filteredCategories: Observable<Category[]>;

  constructor(
    private listService: ListService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productForm = new FormGroup({
      listName: this.listName,
      productName: this.productName,
      categoryName: this.categoryName
    });

    this.filteredProducts = this.productName.valueChanges
      .pipe(
        startWith(''),
        map(product => product ? this._filterProducts(product, this.userProducts) : this.userProducts.slice())
      );

    this.filteredCategories = this.categoryName.valueChanges
      .pipe(
        startWith(''),
        map(category => category ? this._filterProducts(category, this.userCategories) : this.userCategories.slice())
      );
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      this.userProducts = res;
    });

    this.categoryService.getCategories().subscribe((res) => {
      this.userCategories = res;
    });
  }

  addProduct() {
    const prodNameExist = this.products.find((prod) => prod.name === this.productName.value);

    if (!prodNameExist) {
      this.products.push({id: null, name: this.productName.value, category: this.categoryName.value});
    }

    this.products.sort((a, b) => a.name.localeCompare(b.name));
    const unique = [...new Set(this.products.map(item => item.category))];
    console.log(unique);
    this.productName.setValue('');
  }

  saveList() {
    this.listService.saveList({listName: this.listName.value, products: this.products}).subscribe(() => {
      this.products = [];
    });
  }

  changeCategory(productName) {
    for(let i = 0; this.userProducts.length > i; i++) {
      if (this.userProducts[i].name === productName) {
        this.categoryName.setValue(this.userProducts[i].category);
        break;
      } else {
        this.categoryName.setValue('Другое');
      }
    }
  }

  private _filterProducts(value: string, filteredArray: any[]): Product[] {
    const filterValue = value.toLowerCase();
    console.log(this.userProducts);

    return filteredArray.filter(state => state.name.toLowerCase().includes(filterValue));
  }

}
