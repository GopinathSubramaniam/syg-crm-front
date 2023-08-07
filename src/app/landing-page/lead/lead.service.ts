import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClientService) { }

  create(data: any) {
    return this.http.post('/lead', data);
  }

  updateTagsInBulk(selectedRows: any, tags: any) {
    let leadIds = selectedRows.map((row: any) => row.id);
    return this.http.get(`/lead/updateTags?leadIds=${leadIds.join(',')}&tags=${tags.join(',')}`);
  }

  findAll(pageNo: any, perPage: any, filter: any) {
    const statusList = filter.selectedLeadStatus.join(',');
    return this.http.get(`/lead?pageNo=${pageNo}&perPage=${perPage}&searchTxt=${filter.searchTxt}&statusList=${statusList}`);
  }

  searchLeads(searchTxt: any) {
    return this.http.get(`/lead/search?searchTxt=${searchTxt}`);
  }

  deleteInBatch(selectedRows: any) {
    let ids = selectedRows.map((row: any) => row.id);
    return this.http.delete(`/lead?ids=${ids.join(',')}`);
  }

  updateStatusInBulk(selectedRows: any, status: string) {
    let ids = selectedRows.map((row: any) => row.id);
    return this.http.get(`/lead/updateStatus?ids=${ids.join(',')}&status=${status}`);
  }

  detail(id: any) {
    return this.http.get(`/lead/detail/${id}`);
  }

}
