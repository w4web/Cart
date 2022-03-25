import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class fileUploadComponent extends FieldType<FieldTypeConfig> implements OnInit {

  imgSelected = false;
  imageSrc = '../../../assets/images/upload.png';
  alert = false;
  file: any;

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
          this.imgSelected = true;
          this.file = event.target.files[0];
        };
        this.alert = false;
      } else {
        this.alert = true;
      }
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);

    this.http.post<any>('http://localhost:5000/uploadFile', formData).subscribe(res => {
      console.warn('Image uploaded successfuly', res);
      this.imageSrc = res.file;
    });
  }

  onCancel(): void {

  }
}
