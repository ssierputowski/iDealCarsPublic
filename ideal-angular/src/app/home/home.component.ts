import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) { }

  // User variables
  // Fetch from database
  firstName = 'Jerrod';
  lastName = 'Mathis';
  email = 'jerrodmathis95@gmail.com';
  userImg = '../../assets/images/TestImage.jpg';
  jobRole = 'Salesman';

  ngOnInit() {
    this.titleService.setTitle('Home | iDealCars');
  }
}
