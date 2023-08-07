import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { BranchService } from './branch.service';
import { Util } from 'src/app/config/util';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {

  util: any;
  branches: any = [];
  sidebarVisible: boolean = false;
  selectedRows: any;

  branchForm = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    contactPerson: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private branchService: BranchService
  ) { }


  ngOnInit(): void {
    this.util = Util;
    this.findAll();
  }

  onSubmit() {
    if (this.branchForm.valid) {
      this.appService.showSpinner();
      let obj = this.branchForm.value;
      this.branchService.create(obj).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.branchForm.reset();
          this.findAll();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `Branch ${obj.id ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', `Branch ${obj.id ? 'updated' : 'created'} failed`);
        }
      });
    }
  }

  findAll() {
    this.appService.showSpinner();
    this.branchService.findAll(0, 100).subscribe((res: any) => {
      this.appService.hideSpinner();
      this.branches = res.data;
    });
  }

  deleteConfirm(event: Event) {
    this.appService.confirm(event, 'Wanna delete selected branch(s) ?', () => {
      this.appService.showSpinner();
      this.branchService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
        this.appService.hideSpinner();
        this.findAll();
        this.appService.successToast('Success', `Successfully deleted the branch(s)`);
      });
    });
  }

  edit(id: any) {
    const lead: any = this.branches.find((l: any) => {
      return l.id == id;
    });
    this.branchForm.patchValue(lead);
    this.sidebarVisible = true;
  }

}
