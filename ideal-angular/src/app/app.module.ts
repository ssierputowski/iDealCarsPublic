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
<<<<<<< HEAD
  MatTableModule,
  MatRadioModule,
  MatDialogModule,
  MatTabsModule
=======
  MatRadioModule
>>>>>>> 254234dc2bfd279d77a67ba20829a0014f0c9484
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
import { ManagerActionsComponent } from './manager-actions/manager-actions.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

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
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    MatExpansionModule,
<<<<<<< HEAD
    NgxMaskModule.forRoot()
  ],
  entryComponents: [
    ManagerActionsComponent
=======
    MatRadioModule
>>>>>>> 254234dc2bfd279d77a67ba20829a0014f0c9484
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
