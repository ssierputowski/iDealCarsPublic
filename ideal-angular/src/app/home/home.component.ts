import { Component, OnInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title,
    public dialog: MatDialog
  ) { }

  // User variables
  // Fetch from database
  firstName = 'Jerrod';
  lastName = 'Mathis';
  email = 'jerrodmathis95@gmail.com';
  userImg = '../../assets/images/TestImage.jpg';
  jobRole = 'Manager';

  ngOnInit() {
    this.titleService.setTitle('Home | iDealCars');
  }

  openActionsDialog() {
    const dialogRef = this.dialog.open(ManagerActionsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
}

@Component({
  selector: 'app-manager-actions-html',
  styleUrls: ['./home.component.css'],
  template: `
  <h2 mat-dialog-title>Manager Actions</h2>
  <mat-dialog-content class="mat-typography">
    <mat-tab-group color="accent" animationDuration="0ms">
      <mat-tab label="Add Employee">
       <p>I want to add an employee</p>
      </mat-tab>
      <mat-tab label="Generate Schedule">
      </mat-tab>
    </mat-tab-group>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-raised-button mat-dialog-close>CANCEL</button>
    <button mat-raised-button color="accent">SUBMIT</button>
  </mat-dialog-actions>
  `
})
export class ManagerActionsComponent {}
