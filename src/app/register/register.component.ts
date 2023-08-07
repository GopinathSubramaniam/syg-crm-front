import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { RegisterService } from './register.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  disableSubmitBtn = false;

  registerForm = this.fb.group({
    company: this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
    }),
    user: this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })

  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private registerService: RegisterService) {

  }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disableSubmitBtn = true;
      this.appService.showSpinner();
      this.registerService.registerCompany(this.registerForm.value).subscribe((res: any) => {
        this.appService.hideSpinner();
        this.disableSubmitBtn = false;
        if (res.success == true) {
          this.registerForm.reset();
          this.appService.successToast('Success', 'Company Registered Successfully');
        } else {
          let msg = res.statusMsg ? res.statusMsg : 'Something went wrong. Please try again later';
          this.appService.errorToast('Error', msg);
        }
      });
    }
  }
}
