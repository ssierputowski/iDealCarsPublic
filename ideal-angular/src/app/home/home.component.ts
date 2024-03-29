import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ManagerActionsComponent } from '../manager-actions/manager-actions.component';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title,
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  employeeId: string;
  userImg: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userJobRole: string;

  ngOnInit() {
    this.titleService.setTitle('Home | iDealCars');
    this.employeeId = localStorage.getItem('employeeId');
    this.userService.getUser(this.employeeId)
      .subscribe((data) => {
        this.userImg = data['image'];
        this.userFirstName = data['firstName'];
        this.userLastName = data['lastName'];
        this.userEmail = data['emailAddress'];
        this.userJobRole = data['jobRole'].toUpperCase();
      });
  }

  openActionsDialog() {
    this.dialog.open(ManagerActionsComponent, {
      disableClose: true,
      minWidth: '50rem',
      height: '75rem',
    });
  }
}
