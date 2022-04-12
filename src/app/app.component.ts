import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EncryptionDecryptionSample';

  plainText: string = '';
  encryptText: string = '';
  encPassword: string = '';
  decPassword: string = '';
  conversionEncryptOutput: string = '';
  conversionDecryptOutput: string = '';

  constructor(private httpClint: HttpClient,) {
  }
  //method is used to encrypt and decrypt the text  
  convertText(conversion: string) {
    if (conversion == "encrypt") {
      this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
    }
    else {
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

    }
  }

  encryptDataFromBackEnd(data: any) {

    this.getEncryData(this.plainText).subscribe(
      response => {
        console.log('This is enc result-->', response)
      },
      err => {
        console.log('This is enc Error-->', err)

      })

  }

  decryptDataFromBackEnd(data: any) {

  }

  encryptDataFromFrontEnd(data: any) {
    this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();

  }

  decryptDataFromFrontEnd(data: any) {
    this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

  }


  getEncryData(requestData: any) {
    return this.httpClint.post("https://encryption-decryption-demo.herokuapp.com/encrypt", requestData)
  }

}  
