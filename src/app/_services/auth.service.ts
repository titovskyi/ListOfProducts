import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';

import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  getToken() {
    return localStorage.getItem('token');
  }

  login(userData): Observable<User> {
    console.log(userData);
    return this.http.post<User>(`${environment.API.login}`, userData);
  }

  signUp(userData): Observable<User> {
    console.log(userData);

    return this.http.post<User>(`${environment.API.signUp}`, userData);
  }

  getUser() {
    return this.http.get<User>(`${environment.API.user}`);
  }

}
