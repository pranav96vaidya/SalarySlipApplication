import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  sendFile(formData) {
    let url = this.baseUrl + '/rest/admin/upload';
    return this.http.post(url, formData)
  }
}
