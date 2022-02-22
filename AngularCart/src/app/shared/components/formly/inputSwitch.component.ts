import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'custom-inputSwitch',
  template: `
    <label *ngIf="to.label">
      {{to.label}} 
      <span *ngIf="to.required" class="req-sign">*</span>
    </label>
    <div class="cis-wrap">
      <p-inputSwitch [(ngModel)]="to['isEnable']" [formControl]="formControl" [formlyAttributes]="field"></p-inputSwitch>
    </div>
  `,
})

export class CustomInputSwitchComponent extends FieldType<FieldTypeConfig> {}
