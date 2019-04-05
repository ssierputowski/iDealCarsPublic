import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEntryCustomerComponent } from './dialog-entry-customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogEntryCustomerComponent', () => {
  let component: DialogEntryCustomerComponent;
  let fixture: ComponentFixture<DialogEntryCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DialogEntryCustomerComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        FormsModule,
        MatDialogModule,
        RouterTestingModule,
        HttpClientModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
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

