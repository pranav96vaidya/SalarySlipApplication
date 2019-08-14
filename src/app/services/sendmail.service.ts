import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  public sendMailToEmployees(month, year): Observable<any> {
    console.log(month);
    console.log(year);
    const url = `${this.baseUrl}/rest/admin/send_email?month=${month}&year=${year}`;
    return this.http.get(url);
  }
}
