import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  MatDividerModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { HeaderComponent } from './header/header.component';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'records', component: RecordsComponent},
  { path: 'time-clock', component: TimeClockComponent },
  { path: 'inventory', component: InventoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RecordsComponent,
    HeaderComponent,
    TimeClockComponent,
    ScheduleComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
