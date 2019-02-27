import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEntryCustomerComponent } from './dialog-entry-customer.component';

describe('DialogEntryCustomerComponent', () => {
  let component: DialogEntryCustomerComponent;
  let fixture: ComponentFixture<DialogEntryCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEntryCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEntryCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

