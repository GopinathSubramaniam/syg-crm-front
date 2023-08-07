import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppService } from 'src/app/app.service';
import { Util } from 'src/app/config/util';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  tasks = { totalRecords: 0, data: [] };
  filter = { searchTxt: '', status: 'IP', priority: '3', dateRanges: <any>[] };
  sidebarVisible: boolean = false;
  loading: any = true;
  selectedRows: any;
  @ViewChild(Table) table!: Table;


  submitted: boolean = false;

  taskForm = this.fb.group({
    id: ['', []],
    subject: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    priority: ['0', [Validators.required]],
    status: ['TD', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.valid) {
      this.appService.showSpinner();

      const o = this.taskForm.value;
      this.taskService.create(o).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.table.reset();
          this.taskForm.reset();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `Task ${o.id ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', `Task ${o.id ? 'updated' : 'created'} failed`);
        }
      });
    }
  }

  nextPage(event: any = null) {
    this.loading = true;
    let promise = null;
    if (event) {
      const start = event.first == 0 ? 0 : (event.first / event.rows);
      promise = this.taskService.findAll(start, event.rows, this.filter);
    } else {
      promise = this.taskService.findAll(0, Util.PAGE.PER_PAGE, this.filter);
    }
    promise.subscribe((res: any) => {
      this.tasks = res;
      this.loading = false;
    });
  }

  deleteConfirm(event: Event) {
    if (this.selectedRows && this.selectedRows.length > 0) {
      this.appService.confirm(event, 'Wanna delete selected task(s) ?', () => {
        this.appService.showSpinner();
        this.taskService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
          this.appService.hideSpinner();
          this.appService.successToast('Success', 'Successfully deleted the task(s)');
          this.table.reset();
        });
      });
    }
  }

  edit(id: any) {
    let task: any = this.tasks.data.find((c: any) => {
      return c.id == id;
    });
    task.startDate = new Date(task.startDate);
    task.endDate = new Date(task.endDate);
    task.dueDate = new Date(task.dueDate);
    this.taskForm.patchValue(task);
    this.sidebarVisible = true;
  }

  getStatus(val: any) {
    return Util.getStatusObj(val);
  }

  getPriority(val: any) {
    return Util.getPriorityObj(val);
  }


}
