import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContentService } from 'src/app/shared/services/content.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html'
})
export class BlogsComponent implements OnInit {

  blogs: any;
  contentTypeId = "62eca2adfc015e9188a82b17";
  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  constructor( public contentService: ContentService, public msgService: MsgService ) { }

  ngOnInit(): void {

    this.breadcrumbItems = [
      {label: 'Blogs'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

    this.load();

  }

  load() {
    this.contentService.allContents(this.contentTypeId).subscribe({
      next: (res: any) => {
        this.blogs = res['body'];
        if(this.blogs.length < 1) {
          this.msgService.msg('warn', 'Empty!', 'No blogs available!');
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
