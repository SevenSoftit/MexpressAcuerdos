import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTradeAgreementsComponent } from './new-trade-agreements.component';

describe('NewTradeAgreementsComponent', () => {
  let component: NewTradeAgreementsComponent;
  let fixture: ComponentFixture<NewTradeAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTradeAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTradeAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
