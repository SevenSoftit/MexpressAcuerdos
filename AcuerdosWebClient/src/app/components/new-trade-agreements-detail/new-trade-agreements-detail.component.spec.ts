import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTradeAgreementsDetailComponent } from './new-trade-agreements-detail.component';

describe('NewTradeAgreementsDetailComponent', () => {
  let component: NewTradeAgreementsDetailComponent;
  let fixture: ComponentFixture<NewTradeAgreementsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTradeAgreementsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTradeAgreementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
