import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LeadService } from 'src/services/lead.service';
import { Lead } from '../../models/lead.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isFirstOpen = true;
  showFiller = false;

  leads: Lead[] = [];
  totalLeads = 0;
  private leadsSub: Subscription;

  isLoading = false;

  form: FormGroup;

  constructor(
    private router: Router,
    private titleService: Title,
    private leadService: LeadService
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.titleService.setTitle('Home | iDealCars');

    this.form = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required]
      }),
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'number': new FormControl(null, {
        validators: [Validators.required]
      }),
      'comment': new FormControl(null, {
        validators: [Validators.required]
      }),
      'car': new FormControl(null, {
        validators: [Validators.required]
      }),
      'employee': new FormControl(null, {
        validators: [Validators.required]
      }),
      'id': new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.leadService.getLeads();
    // this.leadsSub = this.leadService.getLeadUpdateListener()
      // .subscribe((leadData))
  }

  onTest1() {
    console.log('');
  }

  onTest2() {
    console.log('');
  }

}
