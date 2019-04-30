import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartComponent } from './edit-part.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatDialogModule, MatDividerModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditPartComponent', () => {
  let component: EditPartComponent;
  let fixture: ComponentFixture<EditPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartComponent ],
      imports: [
        FormsModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule,
        MatDividerModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
