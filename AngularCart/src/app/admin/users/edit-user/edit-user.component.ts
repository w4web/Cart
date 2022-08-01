import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})

export class EditUserComponent implements OnInit {

  id: any;
  isAdd = true;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( 
    private router: Router, 
    public userService: UserService, 
    public msgService: MsgService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userService.getUserFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.isEdit();
    });

  }

  isEdit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id ) {
      this.userService.find(this.id).subscribe(res => {
        const user = res['body'];
        this.model = {
          profileImage: user.profileImage,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role,
          verified: user.verified
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
      this.addUser();
    } else {
      this.editUser();
    }

  }

  addUser() {
    this.userService.create(this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'User added successfully!', 2000);
        }
        this.resetFields();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  editUser() {
    this.userService.update(this.id, this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'User edited successfully!', 2000);
        }
        // this.router.navigate(['/admin/user']);
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
