import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContentService } from 'src/app/shared/services/content.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html'
})

export class BlogDetailComponent implements OnInit {

  id: any;
  blog!: any;

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  constructor( public contentService: ContentService, public msgService: MsgService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.loadSingle();
    });

    // breadcrumb

    this.breadcrumbItems = [
      {label: 'Blogs'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

  }

  loadSingle() {
    this.contentService.find(this.id).subscribe({
      next: (res: any) => {
        this.blog = res['body'];
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
