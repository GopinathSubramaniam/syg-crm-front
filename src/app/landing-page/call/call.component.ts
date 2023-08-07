import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppService } from 'src/app/app.service';
import { Util } from 'src/app/config/util';
import { CallService } from './call.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent {
  calls = { totalRecords: 0, data: [] };
  callTypes = [{ label: 'Incoming', value: 'I' }, { label: 'Outgoing', value: 'O' }];
  filter = { type: '', searchTxt: '', rangeDates: <any>[] };

  result = [
    { label: 'None', value: 'N' },
    { label: 'Interested', value: 'I' },
    { label: 'Not Interested', value: 'NI' },
    { label: 'No Response / Busy', value: 'NRB' },
    { label: 'Requested More Info', value: 'RMI' },
    { label: 'Requested Call Back', value: 'RCB' },
    { label: 'Invalid Number', value: 'IN' }
  ];
  sidebarVisible: boolean = false;
  loading: any = true;
  selectedRows: any;
  @ViewChild(Table) table!: Table;

  callForm = this.fb.group({
    id: ['', []],
    subject: ['', [Validators.required]],
    purposeOfCall: ['', [Validators.required]],
    callTo: ['', [Validators.required]],
    callType: ['I', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    result: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private callService: CallService
  ) { }


  ngOnInit(): void { }

  onSubmit() {
    if (this.callForm.valid) {
      this.appService.showSpinner();
      const o = this.callForm.value;
      this.callService.create(o).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.table.reset();
          this.callForm.reset();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `Call ${o.id ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', `Call ${o.id ? 'updated' : 'created'} failed`);
        }
      });
    }
  }

  nextPage(event: any = '') {


    console.log(this.filter);

    this.loading = true;
    let promise = null;
    if (event) {
      const start = event.first == 0 ? 0 : (event.first / event.rows);
      promise = this.callService.findAll(start, event.rows, this.filter);
    } else {
      promise = this.callService.findAll(0, Util.PAGE.PER_PAGE, this.filter);
    }
    promise.subscribe((res: any) => {
      this.calls = res;
      this.loading = false;
    });
  }

  deleteConfirm(event: Event) {
    this.appService.confirm(event, 'Wanna delete selected call(s) ?', () => {
      this.appService.showSpinner();
      this.callService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
        this.appService.hideSpinner();
        this.appService.successToast('Success', 'Successfully deleted the call(s)');
        this.table.reset();
      });
    });
  }

  edit(id: any) {
    const call: any = this.calls.data.find((c: any) => {
      return c.id == id;
    });
    call.startTime = new Date(call.startTime);
    call.endTime = new Date(call.endTime);

    this.callForm.patchValue(call);
    this.sidebarVisible = true;
  }

}
