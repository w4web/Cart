import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { fileUploadComponent } from 'src/app/shared/components/formly/file-upload/file-upload.component';
import { ContentsComponent } from './contents.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { EditContentTypeComponent } from './edit-content-type/edit-content-type.component';

const routes: Routes = [
  { path: '', component: ContentsComponent },
  { path: 'add', component: EditContentComponent },
  { path: 'edit/:id', component: EditContentComponent },
  { path: 'addType', component: EditContentTypeComponent },
  { path: 'editType/:id', component: EditContentTypeComponent }
];

@NgModule({
  declarations: [
    ContentsComponent,
    EditContentComponent,
    EditContentTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: fileUploadComponent }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ],
    }),
  ]
})

export class ContentsModule { }
