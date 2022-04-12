import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './http/token-interreceptor.service';
import { CommonService } from './services/common.service';
import { EncryptionDecryptionComponent } from './encryption-decryption/encryption-decryption.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FileUploadingComponent } from './file-uploading/file-uploading.component';

@NgModule({
  declarations: [
    AppComponent,
    EncryptionDecryptionComponent,
    NavBarComponent,
    FileUploadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CommonService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
