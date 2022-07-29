import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  categories!: any[];
  first = 0;
  rows = 5;

  constructor( public categoryService: CategoryService, public msgService: MsgService ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.categoryService.allCategories().subscribe({
      next: (res: any) => {
        // console.log("res", res['body']['tree']);
        this.categories = res['body']['tree'];
        if(this.categories && this.categories.length < 1) {
          this.msgService.msg('warn', 'Empty!', 'No categories available!');
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  deleteCategory(category: any) {
    if (confirm("Are you sure to delete " + category.name)) {
      this.categoryService.delete(category._id).subscribe({
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
