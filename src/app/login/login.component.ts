import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { userName: '', password: '', _id: null }; //this is the data that is synced to the form
  warning: string;
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (this.user.userName !== '' && this.user.password !== '') {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          localStorage.setItem('access_token', success.token); // store the returned token in local storage as 'access_token'
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.warning = err.error.message; //login info doesn't match?
          //console.log(err.error.message);
          this.loading = false;
        }
      );
    }
    //for checking
    // console.log('submit', {
    //   value: form.value,
    //   valid: form.valid,
    //   dirty: form.dirty,
    //   touched: form.touched,
    //   userName: this.user.userName,
    //   password: this.user.password,
    // });
  }
}
