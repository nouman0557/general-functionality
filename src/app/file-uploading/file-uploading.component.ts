import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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

  encrypt(input: any) {
    var file = input.target.files[0];
    var reader = new FileReader();
    reader.onload = (reader: any) => {
      var key = "1234567887654321";
      var wordArray = CryptoJS.lib.WordArray.create(reader.currentTarget.result);           // Convert: ArrayBuffer -> WordArray
      var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

      var fileEnc = new Blob([encrypted]);                                    // Create blob from string

      var a = document.createElement("a");
      var url = window.URL.createObjectURL(fileEnc);
      var filename = file.name + ".enc";
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file);
  }

  convertWordArrayToUint8Array(wordArray: any) {
    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length), index = 0, word, i;
    for (i = 0; i < length; i++) {
      word = arrayOfWords[i];
      uInt8Array[index++] = word >> 24;
      uInt8Array[index++] = (word >> 16) & 0xff;
      uInt8Array[index++] = (word >> 8) & 0xff;
      uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;

  }

  decrypt(input: any) {
    var file = input.target.files[0];
    var reader = new FileReader();
    reader.onload = (reader: any) => {
      var key = "1234567887654321";

      var decrypted = CryptoJS.AES.decrypt(reader.currentTarget.result, key);               // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
      var typedArray = this.convertWordArrayToUint8Array(decrypted);               // Convert: WordArray -> typed array

      var fileDec = new Blob([typedArray]);                                   // Create blob from typed array

      var a = document.createElement("a");
      var url = window.URL.createObjectURL(fileDec);
      var filename = file.name.substr(0, file.name.length - 4);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    };
    reader.readAsText(file);
  }
}


