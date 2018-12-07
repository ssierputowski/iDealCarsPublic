import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../models/customer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  isFirstOpen = true;
  showFiller = false;

  customers: Customer[] = [];
  totalCustomers = 0;
  private customersSub: Subscription;

  isLoading = false;

  form: FormGroup;

  constructor(
    private router: Router,
    private titleService: Title,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.isLoading = true;
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
    this.customerService.getCustomers();
    this.customersSub = this.customerService.getCustomerUpdateListener()
      .subscribe((customerData: { customers: Customer[] }) => {
        this.isLoading = false;
        this.customers = customerData.customers;
      });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modalTitle', backdrop: 'static'})
      .result.then((res) => {
        this.saveCustomer();
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
