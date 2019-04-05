import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerActionsComponent } from './manager-actions.component';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule, MAT_DIALOG_DATA, MatDialogRef, MatSelectModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManagerActionsComponent', () => {
  let component: ManagerActionsComponent;
  let fixture: ComponentFixture<ManagerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ManagerActionsComponent 
      ],
      imports:[
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => ManagerActionsComponent),
          useValue: "jobRole"
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
