import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { fileUploadComponent } from 'src/app/shared/components/formly/file-upload/file-upload.component';
import { ContentsComponent } from './contents.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { EditContentTypeComponent } from './edit-content-type/edit-content-type.component';
import { contentTypeSelectComponent } from 'src/app/shared/components/formly/contentType-select.component';
import { SlugValidator } from 'src/app/shared/formly-custom.module';
import { EditorComponent } from 'src/app/shared/components/formly/editor.component';

const routes: Routes = [
  { path: 'add', component: EditContentComponent },
  { path: 'edit/:id', component: EditContentComponent },
  { path: 'addType', component: EditContentTypeComponent },
  { path: 'editType/:id', component: EditContentTypeComponent },
  { path: '', component: ContentsComponent },
  { path: ':id', component: ContentsComponent }
];

@NgModule({
  declarations: [
    ContentsComponent,
    EditContentComponent,
    EditContentTypeComponent,
    contentTypeSelectComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: fileUploadComponent },
        { name: 'contentType-select', component: contentTypeSelectComponent, extends: 'input' },
        { name: 'editor', component: EditorComponent, extends: 'input' }
      ],
      validators: [
        { name: 'slug', validation: SlugValidator }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ],
    }),
  ]
})

export class ContentsModule { }
