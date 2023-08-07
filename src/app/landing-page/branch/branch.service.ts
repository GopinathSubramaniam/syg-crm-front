import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClientService) { }

  create(data: any) {
    return this.http.post('/branch', data);
  }

  findAll(pageNo: any, perPage: any) {
    return this.http.get(`/branch?pageNo=${pageNo}&perPage=${perPage}`);
  }

  deleteInBatch(ids: any) {
    return this.http.delete(`/branch?ids=${ids.join(',')}`);
  }
}
