import { Injectable } from '@angular/core';
import { HttpClientService } from '../config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClientService) { }

  login(data: any) {
    return this.http.post('/user/login', data);
  }


}
