import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVinComponent } from './dialog-vin.component';
import { ReactiveFormsModule, ControlContainer, FormsModule } from '@angular/forms';
import { MatTableModule, MatFormFieldModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatCardModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('DialogVinComponent', () => {
  let component: DialogVinComponent;
  let fixture: ComponentFixture<DialogVinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DialogVinComponent 
      ],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        HttpClientModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule,
        MatCardModule,
        MatOptionModule,
        MatSelectModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
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
