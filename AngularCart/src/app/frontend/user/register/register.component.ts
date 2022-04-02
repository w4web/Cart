import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../user.component.scss']
})

export class RegisterComponent implements OnInit {

  success = false;
  error = false;
  errorEmailExists = false;
  msgs: any = [{severity:'success', summary:'Product saved!', detail:'Your Product is saved!'}];

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( public userService: UserService ) {
    this.userService.getRegisterFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit() {}

  submit() {
    this.error = false;
    this.errorEmailExists = false;
    this.success = false;

    this.userService.register( this.model ).subscribe({
      next: (data) => {
        this.success = true;
        this.resetFields();
      },
      error: (err: any) => {
        this.error = true
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
