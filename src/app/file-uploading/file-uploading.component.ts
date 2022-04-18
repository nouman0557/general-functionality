import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploading',
  templateUrl: './file-uploading.component.html',
  styleUrls: ['./file-uploading.component.scss']
})
export class FileUploadingComponent implements OnInit {
  loading = false
  fileName = '';
  fileUrl = 'http://062d-115-186-141-63.ngrok.io/api/send-file'
  fileType = 'multipart'
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  formData = new FormData();
  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    console.log("file-->", file)
    if (file) {
      this.fileName = file.name;

      if (this.fileType = 'multipart') {
        this.formData.append("photo", file);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // this.formData.append("photo", reader.result);
          console.log(reader.result);
        };
      }
    }



  }


  fileUploadedMsg = false
  fileUploadedMsgText = 'File uploaded successfully!'
  submit() {
    this.loading = true
    const upload$ = this.http.post(this.fileUrl, this.formData);
    upload$.subscribe((response: any) => {
      this.loading = false
      this.fileUploadedMsg = true
      setTimeout(() => {
        this.fileUploadedMsg = false
      }, 5000)
      console.log('response-->', response)
    },
      err => {
        this.fileUploadedMsg = true
        this.loading = false
        setTimeout(() => {
          this.fileUploadedMsg = false
        }, 10000)
        this.fileUploadedMsgText = 'File does not uploaded!'
      })
  }
}


