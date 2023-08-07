import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/config/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClientService) { }

  create(data: any) {
    return this.http.post('/meeting', data);
  }

  findAll(pageNo: any, perPage: any, filter: any) {
    return this.http.get(`/meeting?pageNo=${pageNo}&perPage=${perPage}&searchTxt=${filter.searchTxt}&period=${filter.period}`);
  }

  deleteInBatch(selectedRows: any) {
    let ids = selectedRows.map((row: any) => row.meeting.id);
    return this.http.delete(`/meeting?ids=${ids.join(',')}`);
  }

  getParticipants(meetingId: string) {
    return this.http.get(`/meeting/getParticipants?meetingId=${meetingId}`);
  }

  sendEmailNotification(meetingId: string) {
    return this.http.get(`/meeting/sendEmailNotification?meetingId=${meetingId}`);
  }

}
