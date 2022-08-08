import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  comments!: any[];
  first = 0;
  rows = 10;

  constructor( public commentService: CommentService, public msgService: MsgService ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.commentService.allComments().subscribe({
      next: (res: any) => {

        console.log("res", res['body']['list']);

        this.comments = res['body']['list'];
        if(this.comments && this.comments.length < 1) {
          this.msgService.msg('warn', 'Empty!', 'No comments available!');
        }
        
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  deleteComment(comment: any) {
    if (confirm("Are you sure to delete " + comment.name)) {
      this.commentService.delete(comment._id).subscribe({
        next: () => {
          this.load();
        },
        error: (err: any) => {
          this.msgService.errorHandle(err);
        }
      });
    }
  }

}
