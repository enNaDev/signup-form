import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post(submissionUrl: string, data: any): Observable<any> {
    return this.http.post<any>(submissionUrl, data);
  }
}
