import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClientService,
    private app: AppService
  ) { }

  create(data: any) {
    return this.http.post('/task', data);
  }

  addComment(data: any) {
    return this.http.post('/task/comment', data);
  }

  findAll(pageNo: any, perPage: any, filter: any) {
    let url = `/task?pageNo=${pageNo}&perPage=${perPage}&searchTxt=${filter.searchTxt}&status=${filter.status}&priority=${filter.priority}`;

    if (filter.rangeDates && filter.rangeDates.length > 1) {
      const startDate = this.app.formatDateTime(filter.rangeDates[0]);
      const endDate = this.app.formatDateTime(filter.rangeDates[1]);
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }

    return this.http.get(url);
  }

  findTask(id: string) {
    return this.http.get(`/task/${id}`);
  }

  deleteInBatch(selectedRows: any) {
    let ids = selectedRows.map((row: any) => row.id);
    return this.http.delete(`/task?ids=${ids.join(',')}`);
  }

}
