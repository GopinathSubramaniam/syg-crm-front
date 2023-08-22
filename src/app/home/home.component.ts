import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ActivationStart, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { AppService } from '../app.service';
import { LandingPageService } from '../landing-page/landing-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {


  static dialog = { visible: false, content: '', header: '' };
  loginDetail: any = { userName: '', branchName: '' };
  items: MenuItem[] = [
    {
      label: 'Profile', title: 'P', icon: '', command: (ev: MenuItemCommandEvent) => {
        this.menuSelected(ev.item);
      }
    },
    {
      label: 'Settings', title: 'S', icon: '', command: (ev: MenuItemCommandEvent) => {
        this.menuSelected(ev.item);
      }
    },
    {
      label: 'Logout', title: 'L', icon: '', command: (ev: MenuItemCommandEvent) => {
        this.menuSelected(ev.item);
      }
    }
  ];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    private landingPageService: LandingPageService
  ) {
    console.log('LandingPageComponent Called');
    this.loginDetail.userName = localStorage.getItem('userName');
    this.loginDetail.branchName = localStorage.getItem('branchName');


  }

  menuSelected(item: any) {
    console.log('Called = ', item);
    if (item?.title == 'L') {
      const token = localStorage.getItem('token');
      const userDetailId = localStorage.getItem('userDetailId');
      this.landingPageService.logout(token, userDetailId).subscribe((res: any) => {
        localStorage.clear();
        this.router.navigateByUrl('login');
      });
    }
  }
}
