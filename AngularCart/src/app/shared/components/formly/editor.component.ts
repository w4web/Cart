import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'editor',
  template: `
    <p-editor 
      [formControl]="formControl" 
      [formlyAttributes]="field" 
      [style]="{'height':'250px'}">
    </p-editor>
  `,
})

export class EditorComponent extends FieldType<FieldTypeConfig> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {}

}
