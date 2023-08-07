import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }


  successToast(summary: string, detail: string) {
    this.messageService.add({ key: 'tl', severity: 'success', summary: summary, detail: detail });
  }

  errorToast(summary: string, detail: string) {
    this.messageService.add({ key: 'tl', severity: 'error', summary: summary, detail: detail });
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }

  confirm(ev: any, msg: string, acceptFn: any, reject: any = null) {
    this.confirmationService.confirm({
      target: ev.target,
      message: msg,
      icon: 'mdi mdi-alert-outline',
      accept: () => {
        acceptFn();
      },
      reject: () => {
        if (reject) reject();
      }
    });
  }

  isSuperAdmin() {
    return localStorage.getItem('userType') == 'SA';
  }

  isAdmin() {
    return localStorage.getItem('userType') == 'A';
  }

  isEmployee() {
    return localStorage.getItem('userType') == 'E';
  }

  isSameBranch(branchId: any) {
    return branchId == localStorage.getItem('branchId');
  }

  isSameUserDetail(userDetailId: any) {
    return userDetailId == localStorage.getItem('userDetailId');
  }

  showSpinner() {
    setTimeout(() => {
      AppComponent.spinner = true;
    }, 500);
  }

  hideSpinner() {
    setTimeout(() => {
      AppComponent.spinner = false;
    }, 500);
  }

  formatDateTime(d: Date, plusDate: any = 0) {
    let dateNo = d.getDate();
    if (plusDate > 0) {
      dateNo = d.setDate(d.getDate() + plusDate);
    }
    const date = dateNo;
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const dte = `${year}-${month}-${date}`;

    return dte;
  }

}
