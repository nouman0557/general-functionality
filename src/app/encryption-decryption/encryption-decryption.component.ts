import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// const crypto = require('crypto');
// import * as crypto from 'crypto';

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

  PlainTextForBackend = '{ "name": "Nouman", "job":"Private" }'
  returnEncKeyFromBackend = ''

  encyptedTextForfrontEnd = ''
  returnDecTextFromFront = ''

  PlainTextForfrontEnd = ''
  returnEncKeyFromfrontEnd = ''

  encyptedTextForBackend = ''
  returnDecTextFromBackend = ''

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

  loading = false
  encryptDataFromBackEnd() {
    let request = JSON.parse(this.PlainTextForBackend)
    this.getEncryData(request).subscribe(
      (response: any) => {
        this.loading = false
        this.returnEncKeyFromBackend = response.response
        console.log('This is enc result-->', response.response)
      },
      err => {
        this.loading = false
        console.log('This is enc Error-->', err)

      })
  }

  decryptDataFromBackEnd() {
    this.loading = true
    let request = {
      "request": this.encyptedTextForBackend
    }
    console.log('request-->', request)
    this.loading = true
    this.getDecData(request).subscribe(
      (response: any) => {
        this.loading = false
        this.returnDecTextFromBackend = JSON.stringify(response)
        console.log('This is enc result-->', response)
      },
      err => {
        this.loading = false
        console.log('This is enc Error-->', err)

      })
  }

  encryptDataFromFrontEnd(data: any) {
    this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
  }

  encrypt(request: any, key: any) {

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(request), key, {
      keySize: 16,
    });

    return encrypted.toString();

  }

  decrypt(text: any, key: any) {
    // let bytes = CryptoJS.AES.decrypt(request, key);
    // let orignalText = bytes.toString(CryptoJS.enc.Utf8)
    // let object = JSON.parse(orignalText);
    // return object

    // let textParts = text.split(':');
    // let iv = Buffer.from(textParts.shift(), 'hex');
    // let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    // let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

    // let decrypted = decipher.update(encryptedText);
    // let final = decipher.final();
    // decrypted = Buffer.concat([decrypted, final]);
    // return decrypted.toString();
  }

  authTag = ''
  decryptDataFromFrontEnd() {
    let keys = this.encyptedTextForfrontEnd.split(':')
    this.authTag = keys[0]
    let encKey = keys[1]
    console.log("keys-->", keys)

    let bytes = CryptoJS.AES.decrypt(encKey, this.authTag);
    let orignalText = bytes.toString(CryptoJS.enc.Utf8)
    // let object = JSON.parse(orignalText);
    // return object
    this.returnDecTextFromFront = orignalText
    // return encrypted.toString();
    // this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

  }


  getEncryData(requestData: any) {
    return this.httpClint.post("https://encryption-decryption-demo.herokuapp.com/encrypt", requestData)
  }

  getDecData(requestData: any) {
    return this.httpClint.post("https://encryption-decryption-demo.herokuapp.com/decrypt", requestData)
  }

}  
