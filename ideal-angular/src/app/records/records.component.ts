import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from '../../models/customer.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { DialogEntryCustomerComponent } from '../dialog-entry-customer/dialog-entry-customer.component';
import { DialogCustomerEditComponent } from '../dialog-customer-edit/dialog-customer-edit.component';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {

  dialogEntryRef: MatDialogRef<DialogEntryCustomerComponent>;
  dialogCustEditRef: MatDialogRef<DialogCustomerEditComponent>;
  searchForm: FormGroup;
  isLoading = false;
  checked = false;
  customers: Customer[] = [];
  totalCustomers = 0;
  private customersSub: Subscription;
  dataSource: MatTableDataSource<Customer>;

  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private customerService: CustomerService
  ) {}

  displayedColumns = [
    'customerName',
    'customerEmail',
    'customerPhone',
  ];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    if (this.checked) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
    this.titleService.setTitle('Customer Records | iDealCars');
  this.searchForm = new FormGroup({
    'firstName': new FormControl(null, {
      validators: [Validators.required]
    }),
    'lastName': new FormControl(null, {
      validators: [Validators.required]
    }),
    'phoneNumber': new FormControl(null, {
      validators: [Validators.required]
    }),
    'emailAddress' : new FormControl (null, {
      validators: [Validators.required]
    }),
  });
  this.getCustomer();
}

getCustomer(): void {
  this.customerService.getCustomers();
  this.customerService.getCustomerUpdateListener()
    .subscribe((customerData: { customers: Customer[] }) => {
      this.customers = customerData.customers;
      this.dataSource = new MatTableDataSource(this.customers);
    });
  }

  openDialogEntry() {
    this.dialogEntryRef = this.dialog.open(DialogEntryCustomerComponent, {
      disableClose: true,
      minWidth: '50rem',
    });
  }

  print(id: string) {
    alert(id);
  }

  openCustEdit(data: any) {
    const config: MatDialogConfig = {
      disableClose: true,
      minWidth: '50rem',
    };
    this.dialogCustEditRef = this.dialog.open(DialogCustomerEditComponent, config);
    this.dialogCustEditRef.componentInstance.data = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      // vehicleYear: data.vehicleYear,
      // vehicleMake: data.vehicleMake,
      // vehicleModel: data.vehicleModel,
      // vehicleColor: data.vehicleColor,
      // customerRecords: data.customerRecords
      };
    }
}
