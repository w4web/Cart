import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormlyModule } from '@ngx-formly/core';
import { EmailValidator, fieldMatchValidator, minlengthValidationMessages } from 'src/app/shared/formly-custom.module';
import { fileUploadComponent } from 'src/app/shared/components/formly/file-upload/file-upload.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add', component: EditUserComponent },
  { path: 'edit/:id', component: EditUserComponent }
];

@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: fileUploadComponent }
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

export class UsersModule { }
