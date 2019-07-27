import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvidencesModalComponent } from './list-evidences-modal.component';

describe('ListEvidencesModalComponent', () => {
  let component: ListEvidencesModalComponent;
  let fixture: ComponentFixture<ListEvidencesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEvidencesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEvidencesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
