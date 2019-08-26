import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class StartupService {
    baseUrl = environment.baseUrl;
    private _startupData: any;

    constructor(private http: HttpClient) { }

    load(): Promise<any> {
      console.log("hello");
    this._startupData = null;
    const url = `${this.baseUrl}/rest/employee/detail`;
    const promise = this.http.get(url)
        .toPromise()
        .then((data: any) => {
          console.log("inside");
          this._startupData = data['data']['status'];
          console.log(this._startupData);
        })
        .catch((err: any) => Promise.resolve());
        return promise;
    }

    public startupData(): any {
      console.log(this._startupData);
        return this._startupData;
    }
}