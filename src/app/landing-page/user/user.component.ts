import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppService } from 'src/app/app.service';
import { UserService } from './user.service';
import { BranchService } from '../branch/branch.service';
import { Util } from 'src/app/config/util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  selectedUser!: any;
  branches: any = [];
  users = { totalRecords: 0, data: [] };
  sidebarVisible: boolean = false;
  sidebarDetailVisible: boolean = false;
  loading: boolean = true;
  selectedRows: any;

  @ViewChild(Table) table!: Table;

  userForm!: any;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private userService: UserService,
    private branchService: BranchService
  ) { }


  ngOnInit(): void {
    this.branchService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PAGES[2]).subscribe((res: any) => {
      this.branches = res.data;
    });

    if (this.appService.isSuperAdmin()) {
      this.userForm = this.fb.group({
        id: ['', []], // Need this id when update
        userName: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        userType: ['', []],
        userDetail: this.fb.group({
          id: ['', []], // Need this id when update
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          mobile: ['', [Validators.required]],
          workPosition: ['', [Validators.required]],
          address: ['', [Validators.required]],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          country: ['', [Validators.required]],
          branch: this.fb.group({
            id: ['', [Validators.required]],
          })
        })
      });
    } else {
      this.userForm = this.fb.group({
        id: ['', []], // Need this id when update
        userName: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        userType: ['', []],
        userDetail: this.fb.group({
          id: ['', []], // Need this id when update
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          mobile: ['', [Validators.required]],
          workPosition: ['', [Validators.required]],
          address: ['', [Validators.required]],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          country: ['', [Validators.required]],
          branch: this.fb.group({
            id: [localStorage.getItem('branchId'), []],
          })
        })
      });
    }

  }

  onSubmit() {
    if (this.userForm.valid) {
      this.appService.showSpinner();
      const o = this.userForm.value;
      this.userService.create(o).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.table.reset();
          this.userForm.reset();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `User ${o.id ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', 'User creation failed');
        }
      });
    }
  }

  nextPage(event: any) {
    this.loading = true;
    let promise = null;
    if (event) {
      const start = event.first == 0 ? 0 : (event.first / event.rows);
      promise = this.userService.findAll(start, event.rows);
    } else {
      promise = this.userService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PER_PAGE);
    }
    promise.subscribe((res: any) => {
      this.users = res;
      this.loading = false;
    });
  }

  searchUser(val: any) {
    this.loading = true;
    this.userService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PER_PAGE, val).subscribe((res: any) => {
      this.users = res;
      this.loading = false;
    });
  }

  deleteConfirm(event: Event) {
    this.appService.confirm(event, 'Wanna delete selected user(s) ?', () => {
      this.userService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
        this.appService.successToast('Success', 'Successfully deleted the user(s)');
        this.table.reset();
      });
    });
  }

  edit(id: any) {
    const user: any = this.users.data.find((u: any) => {
      return u.id == id;
    });
    this.userForm.patchValue(user);
    this.sidebarVisible = true;
  }

  view(id: string) {
    console.log('View ===== ');
    const user: any = this.users.data.find((u: any) => {
      return u.id == id;
    });
    this.selectedUser = user;
    this.sidebarDetailVisible = true;
  }

}
