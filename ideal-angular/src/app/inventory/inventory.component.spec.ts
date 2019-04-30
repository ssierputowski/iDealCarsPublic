import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../auth/auth.service';
import { InventoryComponent } from './inventory.component';
import { HeaderComponent } from '../header/header.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let userService: Title;

  const routes: Routes = [
    { path: 'inventory', component: InventoryComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InventoryComponent,
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
          useClass: Title,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  // it(`should have as title 'Vehicle Inventory | iDealCars'`, async(() => {
  //   userService = TestBed.get(Title);
  //   console.log(userService);
  //   expect(userService.getTitle()).toBe('Vehicle Inventory | iDealCars');
  // }));

  it(`should call alert`, function () {
    let alert = jasmine.createSpy();
    const oldalert = alert;
    alert = oldalert;
  });

  it(`should not let user past without authentication`, 
  fakeAsync(inject([AuthService], (auth: AuthService) => {
    console.log(auth.getIsAuth());
    // router.navigate(['../inventory'])
    expect(auth.getIsAuth()).toBeFalsy();
  })
));

});
