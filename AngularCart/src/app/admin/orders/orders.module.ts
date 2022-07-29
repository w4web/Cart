import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersComponent } from './orders.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'view/:id', component: ViewComponent }
];

@NgModule({
  declarations: [
    OrdersComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class OrdersModule { }
