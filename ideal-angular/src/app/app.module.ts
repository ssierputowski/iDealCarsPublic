import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
  MatTableModule,
  MatRadioModule,
  MatTabsModule,
  MatDialogModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';
import { ManagerActionsComponent } from './manager-actions/manager-actions.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { DialogEntryCustomerComponent } from './dialog-entry-customer/dialog-entry-customer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RecordsComponent,
    HeaderComponent,
    InventoryComponent,
    ManagerActionsComponent,
    TimeClockComponent,
    DialogEntryComponent,
    DialogEntryCustomerComponent
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
    MatTableModule,
    MatRadioModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    NgxMaskModule.forRoot(),
  ],
  entryComponents: [
    DialogEntryComponent,
    DialogEntryCustomerComponent,
    ManagerActionsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
