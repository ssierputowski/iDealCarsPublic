import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomerEditComponent } from './dialog-customer-edit.component';
import { FormsModule, FormGroup, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { MatTableModule, MatLabel, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogCustomerEditComponent', () => {
  let component: DialogCustomerEditComponent;
  let fixture: ComponentFixture<DialogCustomerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DialogCustomerEditComponent 
      ],
      imports: [
        FormsModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => DialogCustomerEditComponent)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('test typing of some variables.', async() => {
  //   // expect(typeof(component.dialog)).toEqual('object');
  //   // expect(typeof(component.data)).toEqual('object');
  //   // expect(typeof(component.close)).toEqual('function');
  // });
});
