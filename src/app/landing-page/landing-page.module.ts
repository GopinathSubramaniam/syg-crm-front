import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { HighchartsChartModule } from 'highcharts-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './branch/branch.component';
import { CallComponent } from './call/call.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { LeadComponent } from './lead/lead.component';
import { MeetingComponent } from './meeting/meeting.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    DashboardComponent,
    LeadComponent,
    UserComponent,
    BranchComponent,
    CallComponent,
    TaskComponent,
    MeetingComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LandingPageRoutingModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    MenuModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    ConfirmPopupModule,
    MultiSelectModule,
    CalendarModule,
    InputMaskModule,
    InputTextModule,
    SplitButtonModule,
    RadioButtonModule,
    DialogModule,
    TagModule,
    HighchartsChartModule
  ]
})
export class LandingPageModule { }
