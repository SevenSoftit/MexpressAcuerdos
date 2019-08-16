import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsLoaderComponent } from './goals-loader.component';

describe('GoalsLoaderComponent', () => {
  let component: GoalsLoaderComponent;
  let fixture: ComponentFixture<GoalsLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
