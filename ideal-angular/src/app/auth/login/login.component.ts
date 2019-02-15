import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(private router: Router, private titleService: Title, public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) { return; }
    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password);
  }

  ngOnInit() {
    this.titleService.setTitle('Login | iDealCars');
  }

}
