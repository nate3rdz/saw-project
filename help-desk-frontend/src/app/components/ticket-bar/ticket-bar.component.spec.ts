import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBarComponent } from './ticket-bar.component';

describe('TicketBarComponent', () => {
  let component: TicketBarComponent;
  let fixture: ComponentFixture<TicketBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
