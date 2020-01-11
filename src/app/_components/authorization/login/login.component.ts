import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  // public username: FormControl;
  public email: FormControl;
  public password: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['lists']);
      },
      (err) => {
        console.log(err, 'loginErr');
      });
  }

  private createForm() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

}
