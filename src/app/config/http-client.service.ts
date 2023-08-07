import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Util } from './util';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  post(url: string, data: any) {
    const apiUrl = Util.URL.BASE + url;
    console.log(Util.getHeaders());

    return this.http.post(apiUrl, data, Util.getHeaders()).pipe(map(res => { return res }));
  }


  get(url: string) {
    const apiUrl = Util.URL.BASE + url;
    return this.http.get(apiUrl, Util.getHeaders()).pipe(map(res => { return res }));
  }


  delete(url: string) {
    const apiUrl = Util.URL.BASE + url;
    return this.http.delete(apiUrl, Util.getHeaders()).pipe(map(res => { return res }));
  }

  postFormData(url: string, data: any) {
    const apiUrl = Util.URL.BASE + url;
    return this.http.post(apiUrl, data, Util.getHeaders()).pipe(map(res => { return res }));
  }

}
