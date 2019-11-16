import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../_services/category.service';
import {Category} from '../../_models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];

  @ViewChild('categoryName', {static: false}) categoryName: ElementRef;

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  public addCategory() {
    this.categoryService.addCategory(this.categoryName.nativeElement.value).subscribe((res: Category[]) => {
      this.categories = res;
      this.categoryName.nativeElement.value = '';
    });
  }

  public removeCategory(id) {
    this.categoryService.remove(id).subscribe(() => {
      this.categories = [...this.categories.filter((category) => category.id !== id)];
    });
  }

}
