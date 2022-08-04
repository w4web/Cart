import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/shared/models/content.model';
import { MsgService } from 'src/app/shared/services/msg.service';
import { ContentService } from './content.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html'
})

export class ContentsComponent implements OnInit {

  contents!: Content[];
  first = 0;
  rows = 5;
  contentTypeId: any;
  contentType: any;

  constructor( 
    public contentService: ContentService, 
    public msgService: MsgService,
    private router: Router,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(param => {

      this.contentTypeId = param['id'];

      if ( this.contentTypeId ) {
        this.contentService.findType(this.contentTypeId).subscribe(res => {
          this.contentType = res['body'];
        });
      }

      this.load();

    })

  }

  load() {
    this.contentService.allContents(this.contentTypeId).subscribe({
      next: (res: any) => {
        this.contents = res['body'];
        if(this.contents.length < 1) {
          this.msgService.msg('warn', 'Empty!', 'No contents available!', 2000);
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  deleteContentType(contentType: any) {
    if (confirm("Are you sure to delete " + contentType.name)) {
      this.contentService.deleteType(contentType._id).subscribe({
        next: () => {
          this.contentService.callCategories();
          this.router.navigate(['/admin/content']);
        },
        error: (err: any) => {
          this.msgService.errorHandle(err);
        }
      });
    }
  }

  deleteContent(content: any) {
    if (confirm("Are you sure to delete " + content.title)) {
      this.contentService.delete(content._id).subscribe({
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
