import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from 'src/app/shared/services/content.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})

export class CommentsComponent implements OnInit {

  @Input() contentId: any;

  commentText: any = "";

  replyItem = -1;

  comments: any;

  constructor( public contentService: ContentService, public msgService: MsgService ) { }

  ngOnInit(): void {

    this.load();
    
  }

  onReplyOpen(value: any): void {
    this.replyItem = value;
  }

  onReplyClose(): void {
    this.replyItem = -1;
  }

  load() {
    this.contentService.allComments(this.contentId).subscribe({
      next: (res: any) => {
        this.comments = res['body']['tree'];
        console.log("this.comments", this.comments);
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  submit(commentText: any, parentId?: any): void {
    this.contentService.create({commentText, contentId: this.contentId, parentId}).subscribe({
      next: (res: any) => {
        this.load();
        this.commentText = "";
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Comment successfully!', 2000);
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
