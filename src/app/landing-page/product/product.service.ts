import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClientService) { }

  create(data: any) {
    return this.http.postFormData('/product', data);
  }

  findAll(pageNo: any, perPage: any) {
    return this.http.get(`/product?pageNo=${pageNo}&perPage=${perPage}`);
  }

  deleteInBatch(ids: any) {
    return this.http.delete(`/product?ids=${ids.join(',')}`);
  }

}
