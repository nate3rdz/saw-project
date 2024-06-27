import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environment';
import { IAccount } from '../interfaces/IAccount';
import { LocalStorageService } from './localStorage.service';

@Injectable({
    providedIn: 'root'
})
export class MeService {

    constructor(
        private localStorageService: LocalStorageService,
        private httpService: HttpClient
    ) { }

    private readonly apiPath = environment.api.baseUrl;

    private setUserData(account: IAccount) {
        if (!account)
            return;

        this.localStorageService.setItem('help-desk-account', account);
    }

    getUserData() {
        return this.localStorageService.getItem('help-desk-account');
    }

    me(): Observable<HttpResponse<IAccount>> {
        return this.httpService.get<IAccount>(`${this.apiPath}/me`, { observe: 'response' }).pipe(
            tap(data => {
                if (!data?.body?.id || !data?.body?.registerDate || !data?.body?.username || !data?.body?.email || !data?.body?.permissions)
                    throw new Error('Invalid data provided by the server');

                this.setUserData(data?.body);
            })
        )
    }
}
