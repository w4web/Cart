import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FormlyModule } from '@ngx-formly/core';
import { EmailValidator, fieldMatchValidator, minlengthValidationMessages } from 'src/app/shared/formly-custom.module';
import { fileUploadComponent } from 'src/app/shared/components/formly/file-upload/file-upload.component';
import { CategorySelectComponent } from 'src/app/shared/components/formly/category-select.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'add', component: EditCategoryComponent },
  { path: 'edit/:id', component: EditCategoryComponent }
];

@NgModule({
  declarations: [ 
    CategoriesComponent, 
    EditCategoryComponent, 
    CategorySelectComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: fileUploadComponent },
        { name: 'category-select', component: CategorySelectComponent, extends: 'input' }
      ],
      validators: [
        { name: 'email', validation: EmailValidator },
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessages },
      ],
    }),
  ]
})

export class CategoriesModule { }
