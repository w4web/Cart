import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <div class="custom-profileImage">
      <h2 class='mb-4'>Profile picture</h2>
      <div class="grid align-items-center text-center">
        <div class="lg:col-2 md:col-4 col-12">
          <p-card styleClass="shadow-3">
            <img src="./assets/images/no-user.png" alt="Card img.." />
            <ng-template pTemplate="footer">
                Add / Update
            </ng-template>
          </p-card>
        </div>
        <div class="lg:col-2 md:col-3 col-12">
            Or use
        </div>
        <div class="lg:col-2 md:col-4 col-12">
          <p-card styleClass="shadow-3">
            <img src="./assets/images/ari-lennox-avatar.jpg" alt="Card img.." />
            <ng-template pTemplate="footer">
                <i class="pi pi-youtube"></i> YouTube
            </ng-template>
          </p-card>
        </div>
      </div>
    </div>
  `,
})
export class FormlyFieldFile extends FieldType {
  
}
