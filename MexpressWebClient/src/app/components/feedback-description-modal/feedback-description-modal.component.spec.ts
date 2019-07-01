import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDescriptionModalComponent } from './feedback-description-modal.component';

describe('FeedbackDescriptionModalComponent', () => {
  let component: FeedbackDescriptionModalComponent;
  let fixture: ComponentFixture<FeedbackDescriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDescriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
