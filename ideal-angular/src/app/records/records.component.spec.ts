import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { RecordsComponent } from './records.component';
import { HeaderComponent } from '../header/header.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let userService: Title;

  const routes: Routes = [
    { path: 'home', component: RecordsComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecordsComponent,
        HeaderComponent,
      ],
      imports: [
        MatTableModule,
        RouterModule.forRoot(routes),
        HttpClientModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: Title,
          useClass: Title }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'Customer Records | iDealCars'`, async(() => {
    userService = TestBed.get(Title);
    console.log(userService);
    expect(userService.getTitle()).toBe('Customer Records | iDealCars');
  }));

});
