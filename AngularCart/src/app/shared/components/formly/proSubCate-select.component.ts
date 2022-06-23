import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CategoryService } from 'src/app/admin/categories/category.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'proSubCate-select',
  template: `
    <p-dropdown 
      [options]="subCategories" 
      placeholder="Sub category"
      optionLabel="name" 
      optionValue="slug" 
      [formControl]="formControl" 
      [formlyAttributes]="field">
    </p-dropdown>
  `,
})

export class ProSubCateSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {

  public categories: any;
  public subCategories: any;

  constructor( public categoryService: CategoryService, public msgService: MsgService ) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.allCategories().subscribe({
      next: (res: any) => {
        this.categories = res['body']['tree'];
        this.findChild();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  findChild() {
    this.categoryService.parentCategory$.subscribe((parent: any) => 
    {
      this.formControl.setValue(undefined);
      if(parent) {
        let obj = this.categories.find((o:any) => o.slug === parent);
        this.subCategories = obj.children;
      }
    });
  }

}
