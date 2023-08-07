import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private http: HttpClientService, private app: AppService) { }

  create(data: any) {
    return this.http.post('/call', data);
  }

  findAll(pageNo: any, perPage: any, filter: any) {
    let url = `/call?pageNo=${pageNo}&perPage=${perPage}&searchTxt=${filter.searchTxt}&type=${filter.type}`;
    if (filter.rangeDates && filter.rangeDates.length > 1) {
      const startDate = this.app.formatDateTime(filter.rangeDates[0]);
      const endDate = this.app.formatDateTime(filter.rangeDates[1]);
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    return this.http.get(url);
  }

  deleteInBatch(selectedRows: any) {
    let ids = selectedRows.map((row: any) => row.id);
    return this.http.delete(`/call?ids=${ids.join(',')}`);
  }
}
