import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encryption-decryption',
  templateUrl: './encryption-decryption.component.html',
  styleUrls: ['./encryption-decryption.component.scss']
})
export class EncryptionDecryptionComponent implements OnInit {

  plainText: string = '';
  encryptText: string = '';
  encPassword: string = '';
  decPassword: string = '';
  conversionEncryptOutput: string = '';
  conversionDecryptOutput: string = '';

  PlainTextForBackend = ''
  returnEncKeyFromBackend = ''

  encyptedTextForfrontEnd = ''
  returnDecTextFromFront = ''


  PlainTextForFrontend = ''
  encyptedTextForbackend = ''

  encryptionKeyRecFromBackend = ''
  encryptionKeyRecFromFrontend = ''
  constructor(private httpClint: HttpClient,) {
  }

  ngOnInit(): void {
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
      (response: any) => {
        console.log('This is enc result-->', response.response)
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
