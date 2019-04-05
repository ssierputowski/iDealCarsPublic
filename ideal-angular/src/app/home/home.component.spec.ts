import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF } from '@angular/common';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: Title;
  let router: Router;
  // let dialog: ComponentFixture<ManagerActionsComponent>;

  const routes: Routes = [
    { path: 'home', component: HomeComponent },
  ];

  // beforeAll(() => {
  //   TestBed.initTestEnvironment(
  //     BrowserDynamicTestingModule,
  //     platformBrowserDynamicTesting()
  //   );
  // });

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
      ],
      imports: [
        MatTableModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: Title,
          useClass: Title },
          { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  // router = TestBed.get(Router);

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'Home | iDealCars'`, fakeAsync(() => {
    userService = TestBed.get(Title);
    // console.log(userService);
    expect(userService.getTitle()).toBe('Home | iDealCars');
  }));

  it(`should not let user past without authentication`, 
    fakeAsync(inject([AuthService], (auth: AuthService) => {
      console.log(auth.getIsAuth());
      
      expect(auth.getIsAuth()).toBeFalsy();
    })
  ));

  // it(`should have a test manager actions component`, fakeAsync(() => {
  //   const manage = new ManagerActionsComponent();
  //   manage.test();
  //   expect(manage.testVal).toBe(1);
  // }));

});
