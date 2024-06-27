import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-create-dialog',
  templateUrl: './ticket-create-dialog.component.html',
  styleUrl: './ticket-create-dialog.component.scss'
})
export class TicketCreateDialogComponent {

  readonly dialogRef = inject(MatDialogRef<TicketCreateDialogComponent>);

  constructor(private formBuilderService: FormBuilder, private ticketService: TicketService) {

  }

  protected newTicketForm: FormGroup = this.formBuilderService.group({
    subject: ['', Validators.required],
    description: ['', Validators.required],
  })

  create() {
    if (!this.newTicketForm.valid)
      return;

    this.ticketService.create(this.newTicketForm.get('subject')?.value, this.newTicketForm.get('description')?.value).subscribe({
      next: (data) => {
        this.dialogRef.close(data);
      }
    })
  }
}
