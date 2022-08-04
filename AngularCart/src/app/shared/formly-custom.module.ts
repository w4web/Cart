import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function EmailValidator(control: AbstractControl): any {
  if (control.value && !emailRegex.test(control.value)) {
    return {
      email: { message: 'Your email is invalid.' },
    };
  }

  return null;
}

// Slug

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function SlugValidator(control: AbstractControl): any {
  if (control.value && !slugRegex.test(control.value)) {
    return {
      slug: { message: 'Your slug is invalid.' },
    };
  }

  return null;
}

// Slug end..

export function minlengthValidationMessages(err: any, field: any): any {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function fieldMatchValidator(control: AbstractControl): any {

  const { password, passwordConfirm } = control.value;

  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}

// Number Validator

const numRegex = /^[0-9]*$/;
export function numberValidator(control: AbstractControl): any {
  if (control.value && !numRegex.test(control.value)) {
    return {
      onlyNumber: { message: 'Please enter number only.' },
    };
  }

  return null;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class FormlyCustomModule { }
