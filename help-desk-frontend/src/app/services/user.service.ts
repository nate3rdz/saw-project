import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { IAccount } from '../interfaces/IAccount';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  private readonly apiPath = environment.api.baseUrl;

  register(username: string, email: string, password: string): Observable<HttpResponse<any>> {
    return this.httpService.post(`${this.apiPath}/users/register`, {
      username,
      email,
      password
    }, { observe: 'response' });
  }

  login(username: string, password: string): Observable<HttpResponse<{token: string}>> {
    return this.httpService.post<{token: string}>(`${this.apiPath}/users/login`, {
      username,
      password
    }, { observe: 'response' });
  }

  getByUsername(username: string): Observable<HttpResponse<IAccount>> {
    return this.httpService.get<IAccount>(`${this.apiPath}/users/${username}`, {observe: 'response'});
  }

  editData(payload: Partial<IAccount>): Observable<HttpResponse<IAccount>> {
    return this.httpService.patch<IAccount>(`${this.apiPath}/users`, payload, { observe: 'response' });
  }
}
