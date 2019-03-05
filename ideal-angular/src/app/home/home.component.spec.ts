import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { HomeComponent, ManagerActionsComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule, MatDialogModule } from '@angular/material';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: Title;
  // let dialog: ComponentFixture<ManagerActionsComponent>;

  const routes: Routes = [
    { path: 'home', component: HomeComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
      ],
      imports: [
        MatTableModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MatDialogModule
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'Home | iDealCars'`, async(() => {
    userService = TestBed.get(Title);
    console.log(userService);
    expect(userService.getTitle()).toBe('Home | iDealCars');
  }));

  it(`should have a test manager actions component`, async(() => {
    const manage = new ManagerActionsComponent();
    manage.test();
    expect(manage.testVal).toBe(1);
  }));

});
