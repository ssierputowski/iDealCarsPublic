import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/services/customer.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  isFirstOpen = true;
  showFiller = false;

  isLoading = false;

  form: FormGroup;

  constructor(
    private router: Router,
    private titleService: Title,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Client Records | iDealCars');
    this.form = new FormGroup({
      'fname': new FormControl(null, {
        validators: [Validators.required]
      }),
      'lname': new FormControl(null, {
        validators: [Validators.required]
      }),
      'carYear': new FormControl(null, {
        validators: [Validators.required]
      }),
      'carMake': new FormControl(null, {
        validators: [Validators.required]
      }),
      'carModel': new FormControl(null, {
        validators: [Validators.required]
      }),
      'telephone': new FormControl(null, {
        validators: [Validators.required]
      }),
      'email': new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  saveCustomer() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.customerService.addCustomer(
      this.form.value.fname,
      this.form.value.lname,
      this.form.value.carYear,
      this.form.value.carMake,
      this.form.value.carModel,
      this.form.value.telephone,
      this.form.value.email
    );
    this.isLoading = false;
    this.form.reset();
  }
}
