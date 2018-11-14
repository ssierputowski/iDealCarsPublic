import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
// import { TimeClockComponent} from './time-clock/time-clock.component';
import { RecordsComponent } from './records/records.component';
=======
import { HeaderComponent } from './header/header.component';
>>>>>>> bf8cf5cff58267c46ac1691bed51d8a5d9e7771a

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'time-clock', component: TimeClockComponent },
  { path: 'records', component: RecordsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
<<<<<<< HEAD
   // TimeClockComponent,
    RecordsComponent
=======
    HeaderComponent
>>>>>>> bf8cf5cff58267c46ac1691bed51d8a5d9e7771a
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
