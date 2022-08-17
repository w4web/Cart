import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { seoData } from '../shared/constants/seo.constants';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { 
        path: 'home', 
        data: seoData.homePage,
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule) 
      },
      { 
        path: 'products', 
        data: seoData.productPage,
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule) 
      },
      { path: 'myAccount', loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule) },
      { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) }
    ]
  }
];

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class FrontendModule { }
