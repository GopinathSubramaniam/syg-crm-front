import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppService } from 'src/app/app.service';
import { Util } from 'src/app/config/util';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';
import { LeadService } from './lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeadComponent implements OnInit {

  users: any = [];
  leads = { totalRecords: 0, data: [] };
  actions = [{
    label: 'Mark As New', icon: 'mdi mdi-checkbox-marked-circle-auto-outline', value: 'N', command: (ev: any) => {
      this.updateStatus(ev);
    }
  }, {
    label: 'Mark As Won', icon: 'mdi mdi-check', value: 'O', command: (ev: any) => {
      this.updateStatus(ev);
    }
  }, {
    label: 'Mark As Loss', icon: 'mdi mdi-close', value: 'L', command: (ev: any) => {
      this.updateStatus(ev);
    }
  }];

  sidebarVisible: boolean = false;
  loading: any = true;
  selectedRows: any;
  tagsDialog: boolean = false;
  newTags: any = [];
  filter = { selectedLeadStatus: <any>[], searchTxt: '' };
  leadsForTask!: [];

  @ViewChild(Table) table!: Table;

  leadForm = this.fb.group({
    id: ['', []],
    userDetail: this.fb.group({
      id: ['', [Validators.required]]
    }), // Lead owner
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    leadSource: ['', [Validators.required]],
    lastName: ['', []],
    mobile: ['', [Validators.required]],
    street: ['', []],
    state: ['', []],
    country: ['', []],
    city: ['', []],
    zip: ['', []],
    description: ['', []],
    tags: ['', []]
  });

  taskFormSubmitted = false;
  taskFormVisible = false;
  selectedLead!: any;

  leadInfoSidebarVisible = false;

  taskForm = this.fb.group({
    id: ['', []],
    subject: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    priority: ['0', [Validators.required]],
    status: ['TD', [Validators.required]],
    leadIds: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private userService: UserService,
    private leadService: LeadService,
    private taskService: TaskService
  ) { }


  ngOnInit(): void {
    this.userService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PAGES[2]).subscribe((res: any) => {
      this.users = res.data;
    });

  }

  onSubmit() {
    if (this.leadForm.valid) {
      this.appService.showSpinner();
      const o = this.leadForm.value;
      this.leadService.create(o).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.table.reset();
          this.leadForm.reset();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `Lead ${o.id ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', `Lead ${o.id ? 'updated' : 'created'} failed`);
        }
      });
    }
  }

  nextPage(event: any) {
    this.loading = true;
    let promise = null;
    if (event) {
      const start = event.first == 0 ? 0 : (event.first / event.rows);
      promise = this.leadService.findAll(start, event.rows, this.filter);
    } else {
      promise = this.leadService.findAll(0, Util.PAGE.PER_PAGE, this.filter);
    }
    promise.subscribe((res: any) => {
      this.leads = res;
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.leadService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PER_PAGE, this.filter).subscribe((res: any) => {
      this.leads = res;
      this.loading = false;
    });
  }

  deleteConfirm(event: Event) {
    this.appService.confirm(event, 'Wanna delete selected lead(s) ?', () => {
      this.appService.showSpinner();
      this.leadService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
        this.appService.hideSpinner();
        this.selectedRows = [];
        this.appService.successToast('Success', 'Successfully deleted the lead(s)');
        this.table.reset();
      });
    });
  }

  edit(id: any) {
    const lead: any = this.leads.data.find((l: any) => {
      return l.id == id;
    });
    this.leadForm.patchValue(lead);
    this.sidebarVisible = true;
  }

  view(id: any) {
    this.leadService.detail(id).subscribe((res: any) => {
      this.selectedLead = res.data;
    });
    this.leadInfoSidebarVisible = true;
  }

  updateStatus(ev: any) {
    this.appService.confirm(ev.originalEvent, 'Wanna update lead(s) status ?', () => {
      if (this.selectedRows && this.selectedRows.length > 0) {
        this.appService.showSpinner();
        this.leadService.updateStatusInBulk(this.selectedRows, ev.item.value).subscribe((res: any) => {
          this.appService.hideSpinner();
          this.selectedRows = [];
          this.appService.successToast('Success', 'Successfully updated the lead(s)');
          this.table.reset();
        });
      }

    });
  }

  check(val: string) {
    const idx = this.filter.selectedLeadStatus.findIndex((value: string) => {
      return value == val;
    });

    if (idx > -1)
      this.filter.selectedLeadStatus.splice(idx, 1);
    else
      this.filter.selectedLeadStatus.push(val);

    this.search();
  }

  addNewTag(el: any) {
    const val = el.value;
    if (val) {
      const idx = this.newTags.findIndex((o: any) => {
        return o == val;
      });

      if (idx > -1) this.newTags.splice(idx, 1);
      else this.newTags.push(val);

      el.value = '';
      el.focus();
    }
  }

  removeTag(idx: any) {
    this.newTags.splice(idx, 1);
  }

  saveTags(ev: Event) {
    if (this.selectedRows) {
      this.appService.confirm(ev, 'Wanna update lead(s) tags ?', () => {
        this.appService.showSpinner();
        this.leadService.updateTagsInBulk(this.selectedRows, this.newTags).subscribe((res) => {
          this.tagsDialog = false;
          this.newTags = [];
          this.appService.hideSpinner();
          this.appService.successToast('Success', 'Successfully updated the tags');
        });
      });
    } else {
      this.appService.errorToast('Success', 'Please select row(s)');
    }
  }

  searchLeadsForTask(ev: any) {
    this.leadService.searchLeads(ev.target.value).subscribe((res: any) => {
      this.leadsForTask = res.data;
    });
  }

  createTask() {
    this.taskFormSubmitted = true;
    if (this.taskForm.valid) {
      this.appService.showSpinner();

      const o: any = this.taskForm.value;
      o.leadIds = o.leadIds.join(',');
      this.taskService.create(o).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.table.reset();
          this.taskForm.reset();
          this.taskFormVisible = false;
          this.taskFormSubmitted = false;
          this.appService.successToast('Success', 'Task created successfully');
        } else {
          this.appService.errorToast('Error', `Error while creating task`);
        }
      });
    }
  }

}
