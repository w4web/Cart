import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './shared/services/interceptor/auth.interceptor';
import { AuthGuard } from './shared/services/guard/auth.guard';

const routes: Routes = [
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  { path: '', loadChildren: () => import('./frontend/frontend.module').then(m => m.FrontendModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FormlyModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
