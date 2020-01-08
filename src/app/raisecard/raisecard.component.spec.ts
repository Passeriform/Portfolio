import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisecardComponent } from './raisecard.component';

describe('RaisecardComponent', () => {
  let component: RaisecardComponent;
  let fixture: ComponentFixture<RaisecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
