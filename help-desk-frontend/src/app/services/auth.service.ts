import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IAccount } from '../interfaces/IAccount';
import { IntercomponentCommunicationService } from './intercomponentCommunication.service';
import { LocalStorageService } from './localStorage.service';
import { MeService } from './me.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private localStorageService: LocalStorageService,
        private intercomponentComunicationService: IntercomponentCommunicationService, 
        private meService: MeService,
        private routerService: Router
    ) { }

    async isLoggedIn(): Promise<boolean> {
        // if we have user's token already into the cache, lets check if the token is still valid
        if (!!this.localStorageService.getItem('help-desk-token')) {
            return await lastValueFrom(this.meService.me()).then((data) => {
                if (data.status !== 200) {
                    this.localStorageService.clear();
                    return false;
                } else {
                    return true;
                }
            }).catch(() => {
                return false;
            });
        } else return false;
    }

    getToken() {
        return this.localStorageService.getItem('help-desk-token');
    }

    login(token: string) {
        if (!token)
            return;
        
        if (!!this.localStorageService.getItem('help-desk-token'))
            return;

        this.localStorageService.setItem('help-desk-token', token);
        this.intercomponentComunicationService.updateAuthStatus(true);
    }

    setUserData(account: IAccount) {
        if (!account)
            return;

        this.localStorageService.setItem('help-desk-account', account);
    }

    logout() {
        this.localStorageService.clear(); // lets remove all the data related to the website
        this.intercomponentComunicationService.updateAuthStatus(false); // lets update all the other components about the logged-in status
        this.routerService.navigate(['/login']);
    }
}
