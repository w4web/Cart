import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'detail/:id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class ProductModule { }
