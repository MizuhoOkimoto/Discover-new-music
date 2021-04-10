import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = { userName: '', password: '', password2: '' };
  warning: string;
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (
      this.registerUser.userName &&
      this.registerUser.password &&
      this.registerUser.password2
    ) {
      if (this.registerUser.password === this.registerUser.password2) {
        this.loading = true;
        this.auth.register(this.registerUser).subscribe(
          (result) => {
            this.success = true;
            this.warning = null;
            this.loading = false;
          },
          (err) => {
            this.success = false;
            this.warning = err.error.message;
            this.loading = false;
          }
        );
      } else {
        this.warning = 'User information does not match'; //don't forget *ngIf in html file
      }
    }
    //for checking
    // console.log('submit', {
    //   value: form.value,
    //   valid: form.valid,
    //   dirty: form.dirty,
    //   touched: form.touched,
    //   userName: this.registerUser.userName,
    //   password: this.registerUser.password,
    //   password2: this.registerUser.password2,
    // });
  }
}
