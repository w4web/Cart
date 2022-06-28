import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { PrimengLibModule } from './primeng-lib.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCategoryComponent } from '../frontend/product/product-category/product-category.component';
import { ProductCarouselComponent } from '../frontend/product/product-carousel/product-carousel.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ProductCategoryComponent,
    ProductCarouselComponent
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
    ProductCategoryComponent,
    ProductCarouselComponent
  ],
})

export class SharedModule {}
