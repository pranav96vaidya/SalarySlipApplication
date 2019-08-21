import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';

const routes: Routes = [
  {path: '', component: FileUploadComponent, canActivate: [AuthenticationGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
