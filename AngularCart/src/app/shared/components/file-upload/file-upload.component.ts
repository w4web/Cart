import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html'
})
export class fileUploadComponent implements OnInit {

  imgSelected = false;
  imageSrc = '../../../assets/images/avatar.png';
  alert = false;
  files: any;

  constructor( protected http: HttpClient ) {
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
          this.files = event.target.files;
          console.warn(this.files);
        };
        this.alert = false;
      } else {
        this.alert = true;
      }
    }
  }

  onSubmit(): void {
    this.http.post('http://localhost:5000/admin/uploadFile', this.files).subscribe(res => {
      console.warn('Image upload responce', res);
    });
  }
}
