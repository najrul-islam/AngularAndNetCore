import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/account/user.service';
import { createUserModel, IUser } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  errMsg = '';
  userModel: IUser;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userModel = createUserModel();
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.userForm = this.fb.group({
      firstName: [
        this.userModel.firstName,
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      lastName: [
        this.userModel.lastName,
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      email: [
        this.userModel.email,
        Validators.compose([Validators.required, Validators.minLength(3), this.emailValidation()])
      ],
      userName: [
        this.userModel.userName,
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      phone: [
        this.userModel.phone,
        Validators.compose([Validators.minLength(11)])
      ],
      password: [
        this.userModel.password,
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
      if (this.userForm.status === 'INVALID') {
        this.errMsg = 'Form validation error';
        alert(this.errMsg);
        return;
      }
      this.userService.createUser(this.userForm.value).subscribe(res => {
        if (res.error) {
          this.errMsg = 'Something went wrong. Try again.';
          alert(this.errMsg);
        }
        else {
          if (res && res.statusCode === 200) {
            this.router.navigate(['/login']);
          }
          else {
            this.errMsg = res?.message ? res.message : 'Registration failed. Try again.';
            alert(this.errMsg);
          }
        }
      },
        err => {
          try {

            this.errMsg = 'Registration failed. Try again.';
            alert(this.errMsg);
          } catch (e) { }
        },
      );
    } catch (e) {
      throw e;
    }
  }
}
