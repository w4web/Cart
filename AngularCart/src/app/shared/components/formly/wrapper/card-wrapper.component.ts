import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'card-wrapper',
  template: `
    <p-card styleClass="p-card-shadow card-form shadow-3 mb-5">
      <ng-container #fieldComponent></ng-container>
    </p-card>
  `,
})
export class CardComponent extends FieldWrapper { }
