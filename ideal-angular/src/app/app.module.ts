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
  MatSidenavModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { HeaderComponent } from './header/header.component';
import { TimeClockComponent } from './time-clock/time-clock.component';
<<<<<<< HEAD
import { CenterNavComponent } from './center-nav/center-nav.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
=======
import { AccordionModule } from 'ngx-bootstrap/accordion';
>>>>>>> a69f96781c61a8832332fdce173778351563c8fa

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
<<<<<<< HEAD
  { path: 'time-clock', component: TimeClockComponent },
  { path: 'inventory', component: InventoryComponent }
=======
  { path: 'records', component: RecordsComponent},
  { path: 'time-clock', component: TimeClockComponent }
>>>>>>> a69f96781c61a8832332fdce173778351563c8fa
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
<<<<<<< HEAD
    TimeClockComponent,
    CenterNavComponent,
    InventoryComponent,
    SidebarNavComponent,
=======
   // TimeClockComponent,
    RecordsComponent,
    HeaderComponent,
    TimeClockComponent
>>>>>>> a69f96781c61a8832332fdce173778351563c8fa
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
    RouterModule.forRoot(routes),
    AccordionModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
