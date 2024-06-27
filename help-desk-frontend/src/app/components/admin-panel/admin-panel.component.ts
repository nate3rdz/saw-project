import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketsTableAdminDialogComponent } from '../tickets-table-admin-dialog/tickets-table-admin-dialog.component';
import { ITicket } from '../../interfaces/ITicket';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

  @Output('onAdminTicketOpening') protected onAdminTicketOpening: EventEmitter<ITicket | null> = new EventEmitter<ITicket | null>();

  constructor(private dialogService: MatDialog) {

  }

  openTicketsTable() {
    this.dialogService.open(TicketsTableAdminDialogComponent, {
      data: {

      }
    }).afterClosed().subscribe({
      next: (data: ITicket | null) => {
        this.onAdminTicketOpening.emit(data);
      }
    })
  }
}
