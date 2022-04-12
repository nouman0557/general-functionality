import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptionDecryptionComponent } from './encryption-decryption/encryption-decryption.component';
import { FileUploadingComponent } from './file-uploading/file-uploading.component';

const routes: Routes = [

  { path: 'encryption-decryption', component: EncryptionDecryptionComponent },

  { path: 'file-uploading', component: FileUploadingComponent },

  { path: '', redirectTo: 'encryption-decryption', pathMatch: 'full' },

  { path: '**', redirectTo: 'encryption-decryption' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
