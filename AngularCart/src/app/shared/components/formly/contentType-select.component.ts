import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { ContentService } from 'src/app/admin/contents/content.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'contentType-select',
  template: `
    <p-dropdown 
      [options]="contentTypes" 
      placeholder="Select type"
      optionLabel="name" 
      optionValue="_id" 
      [formControl]="formControl" 
      [formlyAttributes]="field">
    </p-dropdown>
    <button #toSetImg type="button" class="hidden" (click)="toSet()"></button>
  `,
})

export class contentTypeSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {

  public contentTypes: any;

  @ViewChild('toSetImg') toSetImg!: ElementRef<HTMLElement>;

  constructor( public contentService: ContentService, public msgService: MsgService ) {
    super();
  }

  ngOnInit(): void {
    this.contentService.allContentTypes().subscribe({
      next: (res: any) => {
        this.contentTypes = res['body'];
        this.contentTypes.push({ _id: undefined, name: 'Un categorized'});
        this.toSet();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  // Patch...

  toSet(): void {
    let el: HTMLElement = this.toSetImg.nativeElement;
    el.click();
  }

}
