import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: ':id', component: BlogDetailComponent },
];

@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class BlogsModule { }
