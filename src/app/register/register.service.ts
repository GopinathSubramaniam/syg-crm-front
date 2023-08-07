import { Injectable } from '@angular/core';
import { HttpClientService } from '../config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClientService) { }

  registerCompany(data: any) {
    return this.http.post('/user', data);
  }

}
