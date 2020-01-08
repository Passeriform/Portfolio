import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotnavComponent } from './pivotnav.component';

describe('PivotnavComponent', () => {
  let component: PivotnavComponent;
  let fixture: ComponentFixture<PivotnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
