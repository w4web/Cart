import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html'
})
export class EditCommentComponent implements OnInit {

  id: any;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( 
    public commentService: CommentService, 
    public msgService: MsgService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.commentService.getCommentFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.isEdit();
    });

  }

  isEdit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.commentService.find(this.id).subscribe(res => {
      const comm = res['body'];
      this.model = {
        commentText: comm.commentText
      }
    });
  }

  save() {
    
    this.commentService.update(this.id, this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Comment edited successfully!');
        }
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
