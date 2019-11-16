import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {List} from '../_models/list';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(
    private http: HttpClient
  ) {
  }

  getLists() {
    return this.http.get<List[]>(`${environment.API.lists}`).pipe(
      map((lists) => lists.map((list) => new List(list.id, list.name)))
    );
  }

  saveList(listName) {
    return this.http.post<any>(`${environment.API.lists}`, listName);
  }

}
