import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MyAccountService } from '../my-account.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})

export class ProfileImageComponent implements OnInit {

  private apiUrl = environment.baseUrl;
  
  imageSrc = '../../../assets/images/upload.png';
  valuePath = "";

  alert = false;
  alertType: any;
  alertMessage: any;

  file: any;

  @ViewChild('toSetImg') toSetImg!: ElementRef<HTMLElement>;

  constructor( protected http: HttpClient, public myAccountService: MyAccountService ) { }

  ngOnInit(): void {
    this.checkToLoad();
  }

  checkToLoad () {
    this.myAccountService.getAccount().subscribe(res => {
      const user = res['body'];
      if (user.profileImage != undefined && user.profileImage != "") {
        this.imageSrc = user.profileImage;
        this.valuePath = user.profileImage;
      }
    });
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
          this.file = event.target.files[0];
          this.fileUpload();
        };
      } else {
        this._alert('error', 'image should be less than 2mb!');
      }
    }
  }

  fileUpload(): void {
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);

    this.http.post<any>(`${this.apiUrl}/uploadFile`, formData).subscribe(res => {
      this.imageSrc = this.apiUrl+'/'+res.file;
      this.valuePath = this.apiUrl+'/'+res.file;
      this.submit();
    });
  }

  submit(): void {
    this.myAccountService.editProfileImage({profileImage: this.valuePath}).subscribe({
      next: () => {
        this._alert('success', 'Image uploaded successfully..');
      },
      error: () => {
        this._alert('error', 'Something went wrong!');
      }
    });
  }

  onCancel(): void {
    this.imageSrc = '../../../assets/images/upload.png';
    this.valuePath = "";
    this.submit();
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

  // Patch...

  toSet(): void {
    let el: HTMLElement = this.toSetImg.nativeElement;
    el.click();
  }

}
