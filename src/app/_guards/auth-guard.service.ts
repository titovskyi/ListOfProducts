import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const token = this.authService.getToken();
    console.log(token);
    if (token) {
      this.authService.checkToken(token).subscribe((res) => {
        if (res) {
          return true;
        } else {
          localStorage.clear();
          this.router.navigate(['auth']);
          return false;
        }
      });
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}
