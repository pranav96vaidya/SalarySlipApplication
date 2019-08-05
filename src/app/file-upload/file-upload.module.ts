import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { DragDropDirective } from '../directives/drag-drop.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FileUploadComponent,
    DragDropDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    FileUploadRoutingModule,
    SharedModule
  ]
})
export class FileUploadModule { }
