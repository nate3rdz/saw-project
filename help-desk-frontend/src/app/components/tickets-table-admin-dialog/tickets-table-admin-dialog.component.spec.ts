import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsTableAdminDialogComponent } from './tickets-table-admin-dialog.component';

describe('TicketsTableAdminDialogComponent', () => {
  let component: TicketsTableAdminDialogComponent;
  let fixture: ComponentFixture<TicketsTableAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsTableAdminDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsTableAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
