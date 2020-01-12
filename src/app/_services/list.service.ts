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

  public getLists() {
    return this.http.get<List[]>(`${environment.API.lists}`).pipe(
      map((lists) => lists.map((list) => new List(list.id, list.name)))
    );
  }

  public getList(listId) {
    return this.http.get<any>(`${environment.API.lists}/${listId}`);
  }

  public saveList(listInfo) {
    return this.http.post<any>(`${environment.API.lists}`, listInfo);
  }

  public updateList(listId, listInfo) {
    return this.http.put<any>(`${environment.API.lists}/${listId}`, listInfo);
  }

  public removeList(listId) {
    return this.http.delete(`${environment.API.lists}/${listId}`);
  }

}
