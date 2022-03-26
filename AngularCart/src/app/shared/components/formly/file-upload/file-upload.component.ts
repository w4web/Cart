import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class fileUploadComponent extends FieldType<FieldTypeConfig> implements OnInit {

  private apiUrl = environment.baseUrl;

  imgSelected = false;
  imageSrc = '../../../assets/images/upload.png';
  imageUrl = "";

  alert = false;
  alertType: any;
  alertMessage: any;

  file: any;

  @ViewChild('toSetImg') toSetImg!: ElementRef<HTMLElement>;

  constructor( protected http: HttpClient ) {
    super();
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].size < 2000000) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          // It is a patch
          this.toSet();
          // -------------
          this.imgSelected = true;
          this.file = event.target.files[0];
        };
      } else {
        this._alert('error', 'image should be less than 2mb!');
      }
    }
  }

  _alert(type: any, message: any): void {
    this.alert = true;
    this.toSet();
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => {
      this.alert = false;
      this.toSet();
    }, 2000);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);

    this.http.post<any>(`${this.apiUrl}/uploadFile`, formData).subscribe(res => {
      this.imageSrc = this.apiUrl+'/'+res.file;
      this.imageUrl = res.file;
      this._alert('success', 'Image uploaded successfully..');
      this.imgSelected = false;
    });
  }

  onCancel(): void {
    this.imageSrc = '../../../assets/images/upload.png';
    this.imgSelected = false;
  }

  // Patch...

  toSet(): void {
    let el: HTMLElement = this.toSetImg.nativeElement;
    el.click();
  }

}
