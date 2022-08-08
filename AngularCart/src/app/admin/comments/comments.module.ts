import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { CommentsComponent } from './comments.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

const routes: Routes = [
  { path: '', component: CommentsComponent },
  { path: 'edit/:id', component: EditCommentComponent }
];

@NgModule({
  declarations: [
    CommentsComponent,
    EditCommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ]
    })
  ]
})
export class CommentsModule { }
