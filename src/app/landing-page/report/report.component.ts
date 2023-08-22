import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent {
  rangeDates: Date[] | undefined;
  reportOptions = [
    { label: 'Lead', value: 'TD', icon: 'mdi mdi-account-filter' },
    { label: 'Task', value: 'IP', icon: 'mdi mdi-checkbox-marked-circle-plus-outline' },
    { label: 'Meeting', value: 'IP', icon: 'mdi mdi-calendar-account-outline' },
    { label: 'Call', value: 'IP', icon: 'mdi mdi-phone-incoming-outgoing' }
  ];
}
