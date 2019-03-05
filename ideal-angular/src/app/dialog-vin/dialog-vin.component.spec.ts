import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVinComponent } from './dialog-vin.component';

describe('DialogVinComponent', () => {
  let component: DialogVinComponent;
  let fixture: ComponentFixture<DialogVinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
