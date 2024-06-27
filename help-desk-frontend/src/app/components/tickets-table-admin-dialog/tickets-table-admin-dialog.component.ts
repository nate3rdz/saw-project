import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { TicketCreateDialogComponent } from '../ticket-create-dialog/ticket-create-dialog.component';
import { IAccount } from '../../interfaces/IAccount';
import { UserService } from '../../services/user.service';
import { ITicket } from '../../interfaces/ITicket';

@Component({
  selector: 'app-tickets-table-admin-dialog',
  templateUrl: './tickets-table-admin-dialog.component.html',
  styleUrl: './tickets-table-admin-dialog.component.scss'
})
export class TicketsTableAdminDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<TicketCreateDialogComponent>);

  protected searchedAccount: IAccount | null = null;

  constructor(private formBuilderService: FormBuilder, private ticketService: TicketService, private userService: UserService) {

  }

  ngOnInit() {
    
  }

  protected userSearchForm: FormGroup = this.formBuilderService.group({
    username: ['', Validators.required],
  })

  searchAccount() {
    if (!this.userSearchForm.valid) {
      return;
    }

    this.userService.getByUsername(this.userSearchForm.get('username')?.value).subscribe({
      next: (data) => {
        this.searchedAccount = data.body;
      }
    })
  }

  openTicket($event: ITicket | null) {
    this.dialogRef.close($event);
  }
}
