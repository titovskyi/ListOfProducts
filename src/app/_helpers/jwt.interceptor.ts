import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../_services/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getToken();

    if (token) {
      const authRequest = req.clone({
        setHeaders: {
          auth: `${token}`
        }
      });

      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
