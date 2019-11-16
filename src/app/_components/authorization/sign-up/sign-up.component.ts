import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  public username: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  @Output()
  public loginActive: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.username = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.confirmPassword = new FormControl('', Validators.required);

    this.signUpForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  // TODO response 201 catch by error. must be in result
  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (res) => {
      },
      (err) => {
        console.log(err, 'err');
        this.authService.login(this.signUpForm.value).subscribe((res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['home']);
        });
      });
  }

}
