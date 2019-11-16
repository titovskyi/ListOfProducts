import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ListService} from '../../_services/list.service';
import {ProductService} from '../../_services/product.service';
import {Product} from '../../_models/product';

@Component({
  selector: 'app-list-form',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  commonListName: string = new Date().toDateString();

  products: Product[] = [];

  @ViewChild('listName', {static: false}) listName: ElementRef;

  @ViewChild('productName', {static: false}) productName: ElementRef;

  constructor(
    private listService: ListService
  ) { }

  ngOnInit() {
  }

  addProduct() {
    const prodName = this.productName.nativeElement.value;

    this.products.push({id: null, name: prodName});
    this.products.sort((a, b) => a.name.localeCompare(b.name));

    this.productName.nativeElement.value = '';
  }

  saveList() {
    this.listService.saveList({listName: this.listName.nativeElement.value, products: this.products}).subscribe((res) => {
      console.log(res);
    });
    console.log({listName: this.listName.nativeElement.value});
  }

}
