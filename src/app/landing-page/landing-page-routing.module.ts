import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../config/auth-guard.service';
import { BranchComponent } from './branch/branch.component';
import { CallComponent } from './call/call.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page.component';
import { LeadComponent } from './lead/lead.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ProductComponent } from './product/product.component';
import { ReportComponent } from './report/report.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { menuId: 'home' },
        canActivate: [AuthGuardService],
      },
      {
        path: 'lead',
        component: LeadComponent,
        data: { menuId: 'lead' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'branch',
        component: BranchComponent,
        data: { menuId: 'branch' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'user',
        component: UserComponent,
        data: { menuId: 'user' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'call',
        component: CallComponent,
        data: { menuId: 'call' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'task',
        component: TaskComponent,
        data: { menuId: 'task' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'meeting',
        component: MeetingComponent,
        data: { menuId: 'meeting' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'product',
        component: ProductComponent,
        data: { menuId: 'product' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'report',
        component: ReportComponent,
        data: { menuId: 'report' },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
