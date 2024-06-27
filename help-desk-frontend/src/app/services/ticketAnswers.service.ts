import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { ITicket } from '../interfaces/ITicket';
import { ITickerAnswer } from '../interfaces/ITicketAnswer';

@Injectable({
  providedIn: 'root'
})
export class TicketAnswersService {

  constructor(private httpService: HttpClient) { }

  private readonly apiPath = environment.api.baseUrl;

  listByTicket(ticketId: number): Observable<HttpResponse<{count: number, answers: ITickerAnswer[]}>> {
    return this.httpService.get<{count: number, answers: ITickerAnswer[]}>(`${this.apiPath}/tickets/${ticketId}/answers`, { observe: 'response' });
  }

  answerTicket(ticketId: number, text: string): Observable<HttpResponse<ITickerAnswer>> {
    return this.httpService.post<ITickerAnswer>(`${this.apiPath}/tickets/${ticketId}`, {text}, { observe: 'response'});
  }
}
