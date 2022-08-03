import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentType } from 'src/app/shared/models/contentType.model';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-edit-content-type',
  templateUrl: './edit-content-type.component.html'
})

export class EditContentTypeComponent implements OnInit {

  id: any;
  isAdd = true;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( 
    private router: Router, 
    public contentService: ContentService, 
    public msgService: MsgService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.contentService.getContentTypeFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.isEdit();
    });

  }

  isEdit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id ) {
      this.contentService.findType(this.id).subscribe(res => {
        const contentType = res['body'];
        this.model = {
          name: contentType.name,
          icon: contentType.icon,
        }
        this.isAdd = false;
      });
    } else {
      this.isAdd = true;
      this.model = {};
    }
  }

  save() {
    
    if( this.isAdd == true ) {
      this.addContentType();
    } else {
      this.editContentType();
    }

  }

  addContentType() {
    this.contentService.createType(this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'ContentType added successfully!', 2000);
        }
        this.resetFields();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  editContentType() {
    this.contentService.updateType(this.id, this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'ContentType edited successfully!', 2000);
        }
        // this.router.navigate(['/admin/ContentType']);
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  resetFields(): void {
    if (this.reset) {
      const el: HTMLElement = this.reset.nativeElement;
      el.click();
    }
  }

}
