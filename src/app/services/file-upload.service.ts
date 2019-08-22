import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  public sendFile(formData): Observable<any> {
    const url = `${this.baseUrl}/rest/admin/upload`;
    return this.http.post(url, formData);
  }

}
