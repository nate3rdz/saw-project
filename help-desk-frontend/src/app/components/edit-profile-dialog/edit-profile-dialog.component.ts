import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { TicketCreateDialogComponent } from '../ticket-create-dialog/ticket-create-dialog.component';
import { MeService } from '../../services/me.service';
import { IAccount } from '../../interfaces/IAccount';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TicketCreateDialogComponent>);

  constructor(private formBuilderService: FormBuilder, private ticketService: TicketService, private meService: MeService, private userService: UserService) {

  }

  protected account: IAccount = this.meService.getUserData();

  ngOnInit() {
    this.profileEditForm.get('email')?.patchValue(this.account.email);
  }

  protected profileEditForm: FormGroup = this.formBuilderService.group({
    email: ['', [Validators.required, Validators.email]]
  })

  editProfile() {
    if (!this.profileEditForm.valid) {
      return;
    }

    this.userService.editData({email: this.profileEditForm.get('email')?.value}).subscribe({
      next: () => {
        this.meService.me().subscribe({
          next: () => {
            this.dialogRef.close();
          }
        })
      }
    })
  }
}
