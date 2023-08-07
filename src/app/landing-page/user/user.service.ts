import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClientService) { }

  findAll(pageNo: any, perPage: any, searchKey: string = '') {
    return this.http.get(`/user/findAll?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`);
  }

  create(data: any) {
    return this.http.post('/user/create', data);
  }

  deleteInBatch(selectedRows: any) {
    let ids = selectedRows.map((row: any) => row.id);
    return this.http.delete(`/user?ids=${ids.join(',')}`);
  }
}
