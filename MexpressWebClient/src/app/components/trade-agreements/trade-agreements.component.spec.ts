import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAgreementsComponent } from './trade-agreements.component';

describe('TradeAgreementsComponent', () => {
  let component: TradeAgreementsComponent;
  let fixture: ComponentFixture<TradeAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
