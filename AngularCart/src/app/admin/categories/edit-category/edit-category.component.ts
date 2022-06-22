import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../category.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {

  id: any;
  isAdd = true;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( 
    private router: Router, 
    public categoryService: CategoryService, 
    public msgService: MsgService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategoryFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.isEdit();
    });

  }

  isEdit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id ) {
      this.categoryService.find(this.id).subscribe(res => {
        const cate = res['body'];
        this.model = {
          image: cate.image,
          name: cate.name,
          parentId: cate.parentId,
        }
        this.isAdd = false;
      });
    } else {
      this.isAdd = true;
      this.model = {};
    }
  }

  save() {
    
    if( this.isAdd == true ) {
      this.addCategory();
    } else {
      this.editCategory();
    }

  }

  addCategory() {
    this.categoryService.create(this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Category added successfully!');
        }
        this.resetFields();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  editCategory() {
    this.categoryService.update(this.id, this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Category edited successfully!');
        }
        // this.router.navigate(['/admin/category']);
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  resetFields(): void {
    if (this.reset) {
      const el: HTMLElement = this.reset.nativeElement;
      el.click();
    }
  }

}
