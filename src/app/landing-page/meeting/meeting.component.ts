import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppService } from 'src/app/app.service';
import { Util } from 'src/app/config/util';
import { UserService } from '../user/user.service';
import { MeetingService } from './meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {

  reminderMins = [
    { label: 'None', value: '0' },
    { label: '5 minutes before', value: '5' },
    { label: '10 minutes before', value: '10' },
    { label: '15 minutes before', value: '15' },
    { label: '30 minutes before', value: '30' },
    { label: '1 hour before', value: '60' },
    { label: '2 hours before', value: '120' },
    { label: '1 day before', value: '24' },
  ];
  participantList!: any;

  meeting = { totalRecords: 0, data: [] };
  sidebarVisible: boolean = false;
  loading: any = true;
  selectedRows: any;
  selectedFilter!: any;

  filter = { period: 'T', searchTxt: '' };

  @ViewChild(Table) table!: Table;

  meetingForm = this.fb.group({
    id: ['', []],
    subject: ['', [Validators.required]],
    place: ['', [Validators.required]],
    description: ['', [Validators.required]],
    reminderMins: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    host: ['', [Validators.required]],
    participants: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private userService: UserService,
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
    this.userService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PER_PAGE).subscribe((res: any) => {
      this.participantList = res.data;
    });
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      this.appService.showSpinner();
      this.meetingService.create(this.meetingForm.value).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.table.reset();
          this.meetingForm.reset();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `Meeting ${this.meetingForm.get('id') ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', `Meeting ${this.meetingForm.get('id') ? 'updated' : 'created'} failed`);
        }
      });
    }
  }

  nextPage(event: any) {
    this.loading = true;
    let promise = null;
    if (event) {
      const start = event.first == 0 ? 0 : (event.first / event.rows);
      promise = this.meetingService.findAll(start, event.rows, this.filter);
    } else {
      promise = this.meetingService.findAll(0, Util.PAGE.PER_PAGE, this.filter);
    }
    promise.subscribe((res: any) => {
      this.meeting = res;
      this.loading = false;
    });
  }

  deleteConfirm(event: Event) {
    this.appService.confirm(event, 'Wanna delete selected meeting(s) ?', () => {
      this.appService.showSpinner();
      this.meetingService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
        this.appService.hideSpinner();
        this.appService.successToast('Success', 'Successfully deleted the meeting(s)');
        this.table.reset();
      });
    });
  }

  edit(id: any) {
    const matchedMeet: any = this.meeting.data.find((o: any) => {
      return o.meeting.id == id;
    });

    let meet = Object.assign({}, matchedMeet.meeting);
    meet.host = meet.host.id;
    meet.reminderMins = meet.reminderMins.toString();
    meet.startTime = new Date(meet.startTime);
    meet.endTime = new Date(meet.endTime);

    this.meetingService.getParticipants(meet.id).subscribe((res: any) => {

      meet.participants = res.data.map((p: any) => {
        return p.id;
      });
      this.meetingForm.patchValue(meet);
      this.sidebarVisible = true;
    });
  }

  getStatus(val: any) {
    return Util.getStatusObj(val);
  }

  getPriority(val: any) {
    return Util.getPriorityObj(val);
  }

  onSidebarHide() {
    this.meetingForm.reset();
  }


  search() {
    console.log('Called = ', this.filter);
    this.nextPage(null);
  }

  sendEmailNotification(meetingId: any) {
    this.appService.showSpinner();
    this.meetingService.sendEmailNotification(meetingId).subscribe((res: any) => {
      this.appService.hideSpinner();
      if (res.success == true) {
        this.appService.successToast('Success', 'Email sent successfully to participant(s)');
      } else {
        this.appService.errorToast('Error', 'Error in sending email to participant(s)');
      }
    });
  }

}
