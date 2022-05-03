import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductFilterComponent,
    CartComponent,
    CheckoutComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class ProductModule { }
