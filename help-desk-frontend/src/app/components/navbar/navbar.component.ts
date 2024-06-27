import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment';
import { AuthService } from '../../services/auth.service';
import { IntercomponentCommunicationService } from '../../services/intercomponentCommunication.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly version = environment.app.version;
  protected isLoggedIn = false;

  constructor(
    protected authService: AuthService, 
    protected intercomponentComunicationService: IntercomponentCommunicationService,
    protected toastrService: ToastrService,
    private dialogService: MatDialog
  ) {

  }

  async ngOnInit() {
    // updates the status of the auth
    this.isLoggedIn = await this.authService.isLoggedIn();

    this.intercomponentComunicationService.authUpdateSubject$.subscribe({
      next: (data) => {
        this.isLoggedIn = data;
      }
    })
  }

  logout() {
    this.authService.logout();
    this.toastrService.success("Logged out with success.", "Logged out", {timeOut: 3000});
  }

  editProfile() {
    this.dialogService.open(EditProfileDialogComponent, {
      data: {
      }
    })
  }
}
