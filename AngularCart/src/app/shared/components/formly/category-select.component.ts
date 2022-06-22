import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CategoryService } from 'src/app/admin/categories/category.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'category-select',
  template: `
    <p-dropdown 
      [options]="categories" 
      [(ngModel)]="selectedCategory" 
      optionLabel="name" 
      optionValue="_id" 
      [formControl]="formControl" 
      [formlyAttributes]="field">
    </p-dropdown>
  `,
})

export class CategorySelectComponent extends FieldType<FieldTypeConfig> implements OnInit {

  public categories: any;
  public selectedCategory: any;

  constructor( public categoryService: CategoryService, public msgService: MsgService ) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.allCategories().subscribe({
      next: (res: any) => {
        // console.log("res", res['body']['tree']);
        this.categories = res['body']['tree'];
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
