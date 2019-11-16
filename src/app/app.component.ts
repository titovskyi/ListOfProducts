import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ngStarterWithAdmin';
  token: string;
  tabLoadTimes: Date[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.authService.login({username: 'admin', password: 'admin'}).subscribe((res) => {
    //   localStorage.setItem('token', res.token);
    // });
  }
}
