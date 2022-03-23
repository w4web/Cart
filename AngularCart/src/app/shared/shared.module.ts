import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { PrimengLibModule } from './primeng-lib.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { fileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    fileUploadComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    PrimengLibModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    PrimengLibModule,

    PageNotFoundComponent,
    fileUploadComponent
  ],
})

export class SharedModule {}
