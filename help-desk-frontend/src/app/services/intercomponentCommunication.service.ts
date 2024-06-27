import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IntercomponentCommunicationService {

    constructor() { }

    private authSubject = new Subject<boolean>();
    authUpdateSubject$ = this.authSubject.asObservable();

    updateAuthStatus (authenticated: boolean) {
        this.authSubject.next(authenticated);
    }
}
