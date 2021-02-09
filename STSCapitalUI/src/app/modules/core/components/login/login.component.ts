import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/account/auth.service';
import { createLoginModel, ILogin } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMsg = '';
  loginModel: ILogin;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
    this.loginModel = createLoginModel();
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.loginForm = this.fb.group({
      email: [
        this.loginModel.email,
        Validators.compose([Validators.required, Validators.minLength(3), this.emailValidation()])
      ],
      password: [
        this.loginModel.password,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ]
    });
  }

  emailValidation(): any {
    return (control: AbstractControl) => {
      const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = emailRegexp.test(control.value);
      return email ? null : { invalid: control.value };
    };
  }

  onSubmit(): void {
    try {
      if (this.loginForm.status === 'INVALID') {
        this.errMsg = 'Form validation error';
        return;
      }
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res.error) {
          this.errMsg = 'Something went wrong. Try again.';
          alert(this.errMsg);
        }
        else {
          if (res && res.statusCode === 200 && res.access_token) {
            this.router.navigate(['/home']);
          }
          else {
            this.errMsg = res?.message ? res.message : 'Your email or password is incorrect. Try again.';
            alert(this.errMsg);
          }
        }
      },
        err => {
          try {

            this.errMsg = 'Your email or password is incorrect. Try again.';
            alert(this.errMsg);
          } catch (e) { }
        },
      );
    } catch (e) {
      throw e;
    }
  }
}
