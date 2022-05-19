import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})

export class ProfileImageComponent implements OnInit, AfterContentChecked {

  private apiUrl = environment.baseUrl;
  valuePath = "";

  imgSelected = false;
  imageSrc = '../../../assets/images/upload.png';

  alert = false;
  alertType: any;
  alertMessage: any;

  file: any;

  @ViewChild('toSetImg') toSetImg!: ElementRef<HTMLElement>;

  constructor( protected http: HttpClient ) {
    
  }

  ngOnInit(): void {}

  ngAfterContentChecked(): void {

    this.checkToLoad();

  }

  checkToLoad () {
    
  }

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
    }, 3000);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);

    this.http.post<any>(`${this.apiUrl}/uploadFile`, formData).subscribe(res => {
      this.imageSrc = this.apiUrl+'/'+res.file;
      this.valuePath = this.apiUrl+'/'+res.file;
      this._alert('success', 'Image uploaded successfully..');
      this.imgSelected = false;
    });
  }

  onCancel(): void {
    this.imageSrc = '../../../assets/images/upload.png';
    this.valuePath = "";
    this.imgSelected = false;
  }

  // Patch...

  toSet(): void {
    let el: HTMLElement = this.toSetImg.nativeElement;
    el.click();
  }

}
