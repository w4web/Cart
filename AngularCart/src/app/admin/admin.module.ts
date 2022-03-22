import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './layouts/header/header.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/landing', pathMatch: 'full' },
      { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
      { path: 'product', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdminModule { }
