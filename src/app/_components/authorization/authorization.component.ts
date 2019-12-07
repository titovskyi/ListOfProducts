import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {TabDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  @ViewChild('login', {static: false}) private loginTab: TabDirective;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const token = this.authService.getToken();

    if (token) {
      this.router.navigate(['lists']);
    }
  }

  loginChange(val) {
    console.log(val);
    this.loginTab.active = true;
  }

}
