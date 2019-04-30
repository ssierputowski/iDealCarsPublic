import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsInventoryComponent } from './parts-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatDialogModule, MatDividerModule, MAT_DIALOG_DATA, MatDialogRef, MatFormFieldModule, MatFormFieldControl } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PartsInventoryComponent', () => {
  let component: PartsInventoryComponent;
  let fixture: ComponentFixture<PartsInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsInventoryComponent ],
      imports: [
        FormsModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule,
        MatDividerModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
