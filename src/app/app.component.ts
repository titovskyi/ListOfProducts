import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './_services/auth.service';
import {List} from './_models/list';
import {ListService} from './_services/list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // #############################################

  constructor(
    private router: Router
  ) {
    console.log(this.router.url);
  }

  // #############################################

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  // #############################################
}
