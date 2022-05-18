import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})

export class VerifyEmailComponent implements OnInit {

  success = false;
  invalid = false;

  constructor(public userService: UserService, private route: ActivatedRoute, public msgService: MsgService) {
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.route.snapshot.paramMap.get('token');
    this.verifyEmail(id, token);
  }

  verifyEmail(id:any, token:any) {
    this.userService.verifyEmail(id, token).subscribe({
      next: (res) => {
        if(res.status == 200) {
          this.success = true;
        }
      },
      error: (err) => {
        if(err.status == 401) {
          this.invalid = true;
        } else {
          this.msgService.errorHandle(err);
        }
      }
    });
  }

}
