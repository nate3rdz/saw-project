import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../environment';
import { ITicket } from '../../interfaces/ITicket';
import { TicketService } from '../../services/ticket.service';

type TableRow = ITicket;

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrl: './tickets-table.component.scss'
})
export class TicketsTableComponent implements OnInit, OnChanges {

  @Output('onTicketBarOpen') onTicketBarOpen: EventEmitter<ITicket | null> = new EventEmitter();

  /** TABLE DATA */
  @Input('updateTable') public updateTable: number = -1;
  @Input('userId') public userId: number = -1;
  @Output('ticketClosed') public ticketClosed: EventEmitter<number> = new EventEmitter();
  protected data: TableRow[] = [];
  protected dataSource = new TicketsDataSource();
  protected readonly columns = ['id', 'subject', 'closed', 'actions'];

  /** PAGINATION INFO */
  protected length: number = 0;
  protected pageSize: number = environment.config.pagination.defaultPageSize;
  protected pageIndex: number = 0;

  constructor(private ticketService: TicketService) {

  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    if (changes['updateTable']?.currentValue) {
      this.getDataSource(this.pageIndex * this.pageSize, this.pageSize);
      this.updateTable = -1;
    }

    if (changes['userId']) {
      this.getDataSource(this.pageIndex * this.pageSize, this.pageSize);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getDataSource(this.pageIndex * this.pageSize, this.pageSize);
  }

  getDataSource(skip: number = 0, limit: number = environment.config.pagination.defaultPageSize) {
    if (this.userId !== -1) {
      this.ticketService.listByUser(this.userId, skip, limit).subscribe({
        next: (data) => {
          this.data = data?.body?.tickets || [];
          this.length = data?.body?.count || 0;
  
          this.dataSource.setData(this.data);
        }
      })
    } else {
      this.ticketService.list(skip, limit).subscribe({
        next: (data) => {
          this.data = data?.body?.tickets || [];
          this.length = data?.body?.count || 0;
  
          this.dataSource.setData(this.data);
        }
      })
    }
  }

  onPaginationChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    this.getDataSource(this.pageIndex * this.pageSize, this.pageSize);
  }

  closeTicket(ticketId: number) {
    if (this.userId) {
      this.ticketService.manage(this.userId, {closed: true}).subscribe({
        next: () => {
          this.getDataSource(this.pageIndex * this.pageSize, this.pageSize);
          this.ticketClosed.emit(ticketId);
        }
      })
    } else {
      this.ticketService.close(ticketId).subscribe({
        next: async () => {
          this.getDataSource(this.pageIndex * this.pageSize, this.pageSize);
          this.ticketClosed.emit(ticketId);
        }
      })
    }
  }
}

class TicketsDataSource extends DataSource<TableRow> {
  private _dataStream = new ReplaySubject<TableRow[]>();

  constructor() {
    super();
  }

  connect(): Observable<TableRow[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: TableRow[]) {
    this._dataStream.next(data);
  }
}
