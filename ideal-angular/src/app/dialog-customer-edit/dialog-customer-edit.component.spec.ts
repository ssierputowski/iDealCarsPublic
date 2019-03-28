import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomerEditComponent } from './dialog-customer-edit.component';

describe('DialogCustomerEditComponent', () => {
  let component: DialogCustomerEditComponent;
  let fixture: ComponentFixture<DialogCustomerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toEqual(true);
  });
});
