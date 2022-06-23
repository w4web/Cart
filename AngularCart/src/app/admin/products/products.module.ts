import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormlyModule } from '@ngx-formly/core';
import { EmailValidator, fieldMatchValidator, minlengthValidationMessages } from 'src/app/shared/formly-custom.module';
import { fileUploadComponent } from 'src/app/shared/components/formly/file-upload/file-upload.component';
import { ProCateSelectComponent } from 'src/app/shared/components/formly/proCate-select.component';
import { ProSubCateSelectComponent } from 'src/app/shared/components/formly/proSubCate-select.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'add', component: EditProductComponent },
  { path: 'edit/:id', component: EditProductComponent }
];

@NgModule({
  declarations: [ 
    ProductsComponent, 
    EditProductComponent, 
    fileUploadComponent, 
    ProCateSelectComponent, 
    ProSubCateSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: fileUploadComponent },
        { name: 'proCate-select', component: ProCateSelectComponent, extends: 'input' },
        { name: 'proSubCate-select', component: ProSubCateSelectComponent, extends: 'input' }
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

export class ProductsModule { }
