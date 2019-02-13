import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  companyName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.companyName = 'iDealCars';
  }

  onLogout() {
    this.authService.logout();
  }

}
