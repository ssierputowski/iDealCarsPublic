import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { RecordsComponent } from './records.component';
import { HeaderComponent } from '../header/header.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Pipe, inject } from '@angular/core';
import { MatTableModule, MatDialogModule, MatCardModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

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
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: Title,
          useClass: Title,
          Pipe },
        { provide: APP_BASE_HREF, useValue: '/'}
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
    // console.log(userService);
    expect(userService.getTitle()).toBe('Customer Records | iDealCars');
  }));

  // it(`should not let user past without authentication`, 
  //   fakeAsync(inject([AuthService], (auth: AuthService) => {
  //     console.log(auth.getIsAuth());
      
  //     expect(auth.getIsAuth()).toBeFalsy();
  //   })
  // ));

});
