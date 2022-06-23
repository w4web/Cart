import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CategoryService } from 'src/app/admin/categories/category.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'proCate-select',
  template: `
    <p-dropdown 
      [options]="categories" 
      placeholder="Select category"
      optionLabel="name" 
      optionValue="slug" 
      (onChange)="onChange($event)" 
      [formControl]="formControl" 
      [formlyAttributes]="field">
    </p-dropdown>
  `,
})

export class ProCateSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {

  public categories: any;

  constructor( public categoryService: CategoryService, public msgService: MsgService ) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.allCategories().subscribe({
      next: (res: any) => {
        this.categories = res['body']['tree'];
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  onChange(event:any) {
    this.categoryService.parentCategory = event.value;
    this.categoryService.getParentCategory();
  }

}
