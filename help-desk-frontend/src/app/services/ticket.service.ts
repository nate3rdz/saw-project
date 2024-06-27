import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { ITicket } from '../interfaces/ITicket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpService: HttpClient) { }

  private readonly apiPath = environment.api.baseUrl;

  list(skip: number = 0, limit: number = environment.config.pagination.defaultPageSize): Observable<HttpResponse<{count: number, tickets: ITicket[]}>> {
    return this.httpService.get<{count: number, tickets: ITicket[]}>(`${this.apiPath}/tickets?skip=${skip}&limit=${limit}`, { observe: 'response' });
  }

  listByUser(userId: number, skip: number = 0, limit: number = environment.config.pagination.defaultPageSize): Observable<HttpResponse<{count: number, tickets: ITicket[]}>> {
    return this.httpService.get<{count: number, tickets: ITicket[]}>(`${this.apiPath}/users/${userId}/tickets?skip=${skip}&limit=${limit}`, { observe: 'response' });
  }

  get(id: number): Observable<HttpResponse<ITicket>> {
    return this.httpService.get<ITicket>(`${this.apiPath}/tickets/${id}`, {observe: 'response'});
  }

  close(id: number): Observable<HttpResponse<ITicket>> {
    return this.httpService.delete<ITicket>(`${this.apiPath}/tickets/${id}`, {observe: 'response'});
  }

  manage(id: number, payload: Partial<ITicket>): Observable<HttpResponse<ITicket>> {
    return this.httpService.patch<ITicket>(`${this.apiPath}/tickets/${id}`, payload, {observe: 'response'});
  }

  create(subject: string, description: string): Observable<HttpResponse<{ID: number}>> {
    return this.httpService.post<{ID: number}>(`${this.apiPath}/tickets`, {subject, description}, {observe: 'response'});
  }
}
