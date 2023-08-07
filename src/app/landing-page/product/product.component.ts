import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Util } from 'src/app/config/util';
import { BranchService } from '../branch/branch.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  selectedFiles!: any;
  branches: any = [];
  medias: any = [];
  sidebarVisible: boolean = false;
  selectedRows: any;

  productForm = this.fb.group({
    product: this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      price: ['', [Validators.required]],
      active: ['1', [Validators.required]],
      branch: this.fb.group({
        id: ['', [Validators.required]]
      })
    })
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private branchService: BranchService,
    private productService: ProductService
  ) {
    this.branchService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PAGES[2]).subscribe((res: any) => {
      this.branches = res.data;
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.appService.showSpinner();

      let obj: any = this.productForm.value;
      let formData = new FormData();
      formData.append('model', JSON.stringify(obj));

      if (this.selectedFiles && this.selectedFiles.length > 0) {
        Array.from(this.selectedFiles).forEach((file: any) => {
          formData.append('files', file);
        });
      }

      this.productService.create(formData).subscribe((res: any) => {
        this.appService.hideSpinner();
        if (res.success == true) {
          this.productForm.reset();
          this.findAll();
          this.sidebarVisible = false;
          this.appService.successToast('Success', `Product ${obj.product.id ? 'updated' : 'created'} successfully`);
        } else {
          this.appService.errorToast('Error', `Product ${obj.product.id ? 'updated' : 'created'} failed`);
        }
      });
    }
  }

  onSelectFile(event: any) {
    this.selectedFiles = (event.target as HTMLInputElement).files;
  }

  findAll() {
    this.appService.showSpinner();
    this.productService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PAGES[2]).subscribe((res: any) => {
      this.appService.hideSpinner();
      this.medias = res.data;
    });
  }

  deleteConfirm(event: Event) {
    this.appService.confirm(event, 'Wanna delete selected product(s) ?', () => {
      this.productService.deleteInBatch(this.selectedRows).subscribe((res: any) => {
        this.findAll();
        this.appService.successToast('Success', `Successfully deleted the product(s)`);
      });
    });
  }

  edit(id: any) {
    const media: any = this.medias.find((m: any) => {
      return m.id == id;
    });

    media.product.expiryDate = new Date(media.product.expiryDate);
    this.productForm.patchValue(media);
    this.sidebarVisible = true;
  }
}
