import { Component } from '@angular/core';
import { ITicket } from '../../interfaces/ITicket';
import { TicketCreateDialogComponent } from '../ticket-create-dialog/ticket-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MeService } from '../../services/me.service';
import { IAccount } from '../../interfaces/IAccount';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected ticket: ITicket | null = null;
  protected adminTicket: ITicket | null = null;
  protected updateTable: number = -1;
  protected updateViewer: number = -1;

  constructor(private dialogService: MatDialog, private meService: MeService) {
    
  }

  protected account: IAccount = this.meService.getUserData();
  protected hasAdminRights: boolean = !!this.account.permissions.find(element => element.name === 'manage-tickets');

  onTicketSelection($event: ITicket | null) {
    this.ticket = $event;
  }

  onAdminTicketSelection($event: ITicket | null) {
    this.adminTicket = $event;
  }

  onTicketClosed($event: number | null) {
    this.updateViewer = $event || -1;
  }

  openNewTicketDialog() {
    this.dialogService.open(TicketCreateDialogComponent, {
      data: {}
    }).afterClosed().subscribe({
      next: async (data) => {
        this.updateTable = data.body.ID;
      }
    })
  }
}
