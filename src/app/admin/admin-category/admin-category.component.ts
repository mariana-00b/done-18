import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/categories/categories.interface';
import { Categories } from 'src/app/shared/models/categories/categories.model';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;

  field: string;
  name: string = '';
  categoryID: string | number | undefined;

  isEmptyInput: boolean;
  isEditCategory: boolean;

  adminCategories: ICategory[] = [];

  constructor(
    private modalService: BsModalService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getAdminCategories();
  }

  private getAdminCategories(): void {
    this.categoriesService.getJSONCategories().subscribe(
      (arrCategories) => {
        this.adminCategories = arrCategories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addAdminCategory(): void {
    this.isEditCategory = false;
    const NEW_CATEGORY: ICategory = new Categories(this.name);
    this.categoriesService.postJSONCategory(NEW_CATEGORY).subscribe(
      () => {
        this.getAdminCategories();
      },
      (error) => {
        console.log(error);
      }
    );
    this.modalRef.hide();
    this.resetForm();
  }

  deleteAdminCategory(id: string | number = 0): void {
    this.categoriesService.deleteJSONCategory(id).subscribe(
      () => {
        this.getAdminCategories();
      },
      (error) => {
        console.log(error);
      }
    );
    this.resetForm();
  }

  saveAdminCategory(): void {
    const EDITED_CATEGORY = new Categories(this.name, this.categoryID);
    this.categoriesService.editJSONCategory(EDITED_CATEGORY).subscribe(
      () => {
        this.getAdminCategories();
      },
      (error) => {
        console.log(error);
      }
    );
    this.modalRef.hide();
    this.resetForm();
  }

  saveCurrentCategory(category: ICategory): void {
    this.name = category.name;
    this.categoryID = category.id;
  }

  openModal(template: TemplateRef<any>, status: boolean) {
    this.modalRef = this.modalService.show(template);
    this.checkEmptyInput();
    this.isEditCategory = status;
  }

  resetForm(): void {
    this.name = '';
  }

  openConfirm(confirmation: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmation, {
      class: 'modal-dialog-centered modal-sm',
    });
  }

  confirm(): void {
    this.deleteAdminCategory(this.categoryID);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  checkEmptyInput() {
    if (!this.name) {
      this.isEmptyInput = true;
      return;
    }
    this.isEmptyInput = false;
  }
}
