import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { EmailValidator, fieldMatchValidator, minlengthValidationMessages } from 'src/app/shared/formly-custom.module';
import { MyAccountComponent } from './my-account.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';

const routes: Routes = [
  { path: '', component: MyAccountComponent,
    children: [
      { path: '', redirectTo: '/myAccount/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MyDashboardComponent },
      { path: 'orders', component: MyOrdersComponent },
      { path: 'edit', component: EditAccountComponent },
      { path: 'editAddress', component: EditAddressComponent },
      { path: 'changePassword', component: ChangePasswordComponent }
    ]
  }
];

@NgModule({
  declarations: [
    MyAccountComponent,
    MyDashboardComponent,
    MyOrdersComponent,
    EditAccountComponent,
    EditAddressComponent,
    ChangePasswordComponent,
    ProfileImageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyModule.forRoot({
      types: [],
      validators: [
        { name: 'email', validation: EmailValidator },
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessages },
      ],
    })
  ]
})

export class MyAccountModule { }
