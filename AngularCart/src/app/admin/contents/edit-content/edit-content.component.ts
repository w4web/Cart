import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html'
})

export class EditContentComponent implements OnInit {

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

    this.contentService.getContentFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.isEdit();
    });

  }

  isEdit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id ) {
      this.contentService.find(this.id).subscribe(res => {
        console.log("res['body']", this.id);
        const content = res['body'];
        this.model = {
          title: content.title,
          subTitle: content.subTitle,
          description: content.description,
          image: content.image,
          slug: content.slug,
          contentTypeId: content.contentTypeId,
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
      this.addContent();
    } else {
      this.editContent();
    }

  }

  addContent() {
    this.contentService.create(this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Content added successfully!', 2000);
        }
        this.resetFields();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  editContent() {
    this.contentService.update(this.id, this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Content edited successfully!', 2000);
        }
        // this.router.navigate(['/admin/content']);
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

  previousState(): void {
    window.history.back();
  }

}
