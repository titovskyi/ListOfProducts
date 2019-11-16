import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Category} from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getCategories(): Observable<Category[]> | null {
    return this.http.get(`${environment.API.category}`).pipe(
      map((categories: []) => categories.map((category: Category) => new Category(category.id, category.name)))
    );
  }

  public addCategory(name: string) {
    return this.http.post(`${environment.API.category}`, {categoryName: name});
  }

  public remove(categoryId) {
    return this.http.delete(`${environment.API.category}/${categoryId}`);
  }

}
