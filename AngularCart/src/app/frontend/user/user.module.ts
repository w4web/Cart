import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { EmailValidator, fieldMatchValidator, minlengthValidationMessages } from 'src/app/shared/formly-custom.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifyEmail/:id/:token', component: VerifyEmailComponent },
  { path: 'passwordReset', component: PasswordResetInitComponent },
  { path: 'passwordReset/:id/:token', component: PasswordResetFinishComponent }
];

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    PasswordResetInitComponent, 
    PasswordResetFinishComponent, VerifyEmailComponent
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
    }),
  ]
})

export class UserModule { }
