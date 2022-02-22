import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'custom-input',
  template: `
    <label *ngIf="to.label">
      <fa-icon class="mr-1" *ngIf="to['labelIcon']" [icon]="[to['labelIcon'].prefix, to['labelIcon'].name]"></fa-icon>
      {{to.label}} 
      <span *ngIf="to.required" class="req-sign">*</span>
    </label>
    <div class="ci-wrap" [class.hasIcon]="to['icon']">
      <input type="{{to.type}}" pInputText class="form-control" [formControl]="formControl" [formlyAttributes]="field" />
      <fa-icon *ngIf="to['icon']" [icon]="[to['icon'].prefix, to['icon'].name]"></fa-icon>
    </div>
  `,
})

export class CustomInputComponent extends FieldType<FieldTypeConfig> {}
