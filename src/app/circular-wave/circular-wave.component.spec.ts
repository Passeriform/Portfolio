import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularWaveComponent } from './circular-wave.component';

describe('CircularWaveComponent', () => {
  let component: CircularWaveComponent;
  let fixture: ComponentFixture<CircularWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
