import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socket, io } from 'socket.io-client';
import { IAccount } from '../../interfaces/IAccount';
import { ISocketMsg } from '../../interfaces/ISocketMsg';
import { ITicket } from '../../interfaces/ITicket';
import { ITickerAnswer } from '../../interfaces/ITicketAnswer';
import { LocalStorageService } from '../../services/localStorage.service';
import { MeService } from '../../services/me.service';
import { NotificationService } from '../../services/notification.service';
import { TicketService } from '../../services/ticket.service';
import { TicketAnswersService } from '../../services/ticketAnswers.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-ticket-bar',
  templateUrl: './ticket-bar.component.html',
  styleUrl: './ticket-bar.component.scss'
})
export class TicketBarComponent implements OnInit, OnChanges {

  constructor(
    private ticketService: TicketService,
    private ticketAnswersService: TicketAnswersService,
    private meService: MeService,
    private formBuilderService: FormBuilder,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {

  }

  @ViewChild('textbox')
  private textbox!: ElementRef;

  @Input('id') id: number = -1;
  @Input('adminId') adminId: number = -1;
  @Input('update') public update: number = -1;

  protected ticket: ITicket | null = null;
  protected answers: ITickerAnswer[] = [];
  protected account: IAccount = this.meService.getUserData();
  private socket: Socket | null = io(environment.api.socketIoUrl).connect();

  protected answerForm: FormGroup = this.formBuilderService.group({
    text: ['', Validators.required],
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']?.currentValue === -1)
      return;
    else if (changes['adminId']) {
      this.id = -1;

      // lets register the socket in order to await new notifications
      this.socket?.on(`newAnswer-${this.adminId}`, (msg: ISocketMsg) => {
        if (Number(msg.ticketId) === this.adminId) {
          this.notificationService.playNotificationSound();
          this.reloadAnswers();
        }
      })

      this.reloadAnswers();
    } else if (changes['update']?.currentValue === this.id || changes['id']?.currentValue) {
      this.adminId = -1;

      // lets register the socket in order to await new notifications
      this.socket?.on(`newAnswer-${this.id}`, (msg: ISocketMsg) => {
        if (Number(msg.ticketId) === this.ticket?.id) {
          this.notificationService.playNotificationSound();
          this.reloadAnswers();
        }
      })

      this.reloadAnswers();
    }
  }

  ngOnInit(): void {
  }

  reloadAnswers() {
    if (this.adminId !== -1) {
      this.ticketService.get(this.adminId).subscribe({
        next: (data) => {
          this.ticket = data.body;
  
          if (this.ticket?.closed)
            this.answerForm.get('text')?.disable();
          else
            this.answerForm.get('text')?.enable();
  
          if (this.ticket?.id) {
            this.ticketAnswersService.listByTicket(this.ticket.id).subscribe({
              next: (data) => {
                this.answers = data.body?.answers || [];
                try {
                  this.textbox.nativeElement.scrollTop = this.textbox.nativeElement.scrollHeight + 1;
                } catch (e) {
                  console.error('Error while updating scrollbar.');
                }
              }
            })
          }
        }
      })
    } else {
      this.ticketService.get(this.id).subscribe({
        next: (data) => {
          this.ticket = data.body;
  
          if (this.ticket?.closed)
            this.answerForm.get('text')?.disable();
          else
            this.answerForm.get('text')?.enable();
  
          if (this.ticket?.id) {
            this.ticketAnswersService.listByTicket(this.ticket.id).subscribe({
              next: (data) => {
                this.answers = data.body?.answers || [];
                try {
                  this.textbox.nativeElement.scrollTop = this.textbox.nativeElement.scrollHeight + 1;
                } catch (e) {
                  console.error('Error while updating scrollbar.');
                }
              }
            })
          }
        }
      })
    }
  }

  answer() {
    if (!this.ticket || !this.answerForm.get('text')?.value)
      return;

    if (this.adminId !== -1) {
      this.ticketAnswersService.answerTicket(this.adminId, this.answerForm.get('text')?.value).subscribe({
        next: (data) => {
          this.reloadAnswers();
          this.answerForm.reset();
  
          this.socket?.emit(`newAnswer-${this.ticket?.id}`, { token: this.localStorageService.getItem('help-desk-token'), ticketId: this.ticket?.id })
        }
      })
    } else {
      this.ticketAnswersService.answerTicket(this.id, this.answerForm.get('text')?.value).subscribe({
        next: (data) => {
          this.reloadAnswers();
          this.answerForm.reset();
  
          this.socket?.emit(`newAnswer-${this.ticket?.id}`, { token: this.localStorageService.getItem('help-desk-token'), ticketId: this.ticket?.id })
        }
      })
    }
  }



}
