import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEntryComponent } from './dialog-entry.component';
import { MatFormFieldModule, MatTableModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEntryComponent', () => {
  let component: DialogEntryComponent;
  let fixture: ComponentFixture<DialogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DialogEntryComponent
      ],
      imports: [
        MatFormFieldModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule
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
    fixture = TestBed.createComponent(DialogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   console.log(component)
  //   // expect(component).toBeTruthy();
  // });
});
