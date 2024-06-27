import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.isLoggedIn().then((result) => {
            if (result)
                return true;
            else {
                this.toastrService.error(
                    'You must be logged in to access this area.',
                    'Error', {
                    timeOut: 3000
                }
                );
                this.router.navigate(['/login']);
                return false;
            }
        }).catch(() => {
            return false;
        })
    }
}