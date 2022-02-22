import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'custom-select',
  template: `
    <label *ngIf="to.label">
      <fa-icon class="mr-1" *ngIf="to['labelIcon']" [icon]="[to['labelIcon'].prefix, to['labelIcon'].name]"></fa-icon>
      {{to.label}} 
      <span *ngIf="to.required" class="req-sign">*</span>
    </label>
    <div class="cs-wrap" [class.hasIcon]="to['icon']">
      <p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="label" optionValue="value" [formControl]="formControl" [formlyAttributes]="field"></p-dropdown>
      <fa-icon *ngIf="to['icon']" [icon]="[to['icon'].prefix, to['icon'].name]"></fa-icon>
    </div>
  `,
})

export class CustomSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {

  cities: any;
  selectedCity: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.cities = this.to['options'];
  }

}
