import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ManagerActionsComponent } from '../manager-actions/manager-actions.component';

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
    this.dialog.open(ManagerActionsComponent, {
      disableClose: true,
      minWidth: '50rem',
      height: '70rem',
    });
  }
}
