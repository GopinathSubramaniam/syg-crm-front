import { Injectable } from '@angular/core';
import { HttpClientService } from '../config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http: HttpClientService) { }

  logout(token: any, userDetailId: any) {
    let url = `/user/logout?token=${token}&userDetailId=${userDetailId}`;
    return this.http.get(url);
  }

}
