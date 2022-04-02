import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../user.component.scss'],
  providers: [ MessageService ]
})

export class RegisterComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( public userService: UserService, private messageService: MessageService ) {
    this.userService.getRegisterFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit() {}

  submit() {

    this.userService.register( this.model ).subscribe({
      next: (data) => {
        this.messageService.add({severity:'success', summary:'User registered!', detail:'User registered successfully!'});
        this.resetFields();
      },
      error: (err: any) => {
        this.errorHandle(err);
      }
    });
  }

  resetFields(): void {
    if (this.reset) {
      const el: HTMLElement = this.reset.nativeElement;
      el.click();
    }
  }

  errorHandle (err:any) {

    if ( err.status === 409 ) {

      this.messageService.add({
        severity: 'error', 
        summary: err.error.type, 
        detail: err.error.message
      });

    } else {

      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong!'});

    }

  }

}
