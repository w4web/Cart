import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {

  users!: User[];
  first = 0;
  rows = 5;

  constructor( public userService: UserService, public msgService: MsgService ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.userService.allUsers().subscribe({
      next: (res: any) => {
        this.users = res['body'];
        if(this.users.length < 1) {
          this.msgService.msg('warn', 'Empty!', 'No users available!');
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  deleteUser(user: any) {
    if (confirm("Are you sure to delete " + user.name)) {
      this.userService.delete(user._id).subscribe({
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
