import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { LoginService } from './login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private loginService: LoginService) {
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.appService.showSpinner();
      this.loginService.login(this.loginForm.value).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          localStorage.setItem('userDetailId', res.data.userDetail.id);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', res.data.userName);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('userType', res.data.userType);

          localStorage.setItem('branchId', res.data.userDetail.branch.id);
          localStorage.setItem('branchName', res.data.userDetail.branch.name);
          localStorage.setItem('companyId', res.data.userDetail.branch.company.id);

          this.appService.navigate('/home');
        } else {
          let msg = res.statusMsg ? res.statusMsg : 'Something went wrong. Please try again later';
          this.appService.errorToast('Error', msg);
        }
      });
    }
  }

}
