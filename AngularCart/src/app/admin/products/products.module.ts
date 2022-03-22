import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'add', component: EditProductComponent },
  { path: 'edit/:id', component: EditProductComponent }
];

@NgModule({
  declarations: [ ProductsComponent, EditProductComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class ProductsModule { }
