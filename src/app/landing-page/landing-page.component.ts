import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ActivationStart, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { LandingPageService } from './landing-page.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  // providers: [MessageService]
})
export class LandingPageComponent {

  static dialog = { visible: false, content: '', header: '' };
  loginDetail: any = { userName: '', branchName: '' };
  activeMenu: string = '';
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


    router.events.subscribe(event => {
      if (event instanceof ActivationStart || (event instanceof ActivationEnd && Object.keys(event.snapshot.data).length > 0)) {
        this.activeMenu = event.snapshot.data['menuId'];
        console.log('ActivationStart = ', this.activeMenu);
      }
    });
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

  getDialog() {
    return LandingPageComponent.dialog;
  }

}
