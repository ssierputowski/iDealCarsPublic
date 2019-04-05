import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';
import { DialogEntryCustomerComponent } from './dialog-entry-customer/dialog-entry-customer.component';
import { DialogVinComponent } from './dialog-vin/dialog-vin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './auth/login/login.component';
import { ManagerActionsComponent } from './manager-actions/manager-actions.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { RecordsComponent } from './records/records.component';
import { TimeClockComponent } from './time-clock/time-clock.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DialogCustomerEditComponent } from './dialog-customer-edit/dialog-customer-edit.component';

import { NotificationService } from '../services/notification.service';
import { AddPartComponent } from './add-part/add-part.component';
import { EditPartComponent } from './edit-part/edit-part.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    DialogEntryComponent,
    DialogEntryCustomerComponent,
    DialogVinComponent,
    HeaderComponent,
    HomeComponent,
    InventoryComponent,
    LoginComponent,
    ManagerActionsComponent,
    RecordsComponent,
    TimeClockComponent,
    DialogCustomerEditComponent,
    MessageBoardComponent,
    AddPartComponent,
    EditPartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [
    DialogEntryComponent,
    ManagerActionsComponent,
    DialogVinComponent,
    DialogEntryCustomerComponent,
    DialogCustomerEditComponent,
    AddPartComponent,
    EditPartComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NotificationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
