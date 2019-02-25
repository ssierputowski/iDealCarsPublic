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
  MatTableModule,
  MatRadioModule,
  MatTabsModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';
import { ManagerActionsComponent } from './manager-actions/manager-actions.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'records', component: RecordsComponent},
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
    InventoryComponent,
    DialogEntryComponent,
    ManagerActionsComponent
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogEntryComponent, ManagerActionsComponent]
})
export class AppModule { }
