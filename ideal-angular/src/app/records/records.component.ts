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
  dataSource: MatTableDataSource<Customer>;

  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private customerService: CustomerService
  ) {}

  displayedColumns = [
    'customerName',
    'customerId',
    'customerEmail',
    'customerPhone',
    'customerAddress',
  ];
  filterValues = {
    firstName: '',
    lastName: '',
  };

  FName = new FormControl('');
  LName = new FormControl('');

  /* applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

  ngOnInit() {

    this.titleService.setTitle('Customer Records | iDealCars');
    this.FName.valueChanges
    .subscribe(
      Fname => {
        this.filterValues.firstName  = Fname.toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );
    this.LName.valueChanges
      .subscribe(
        LName => {
          this.filterValues.lastName = LName.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.getCustomer();
}

getCustomer(): void {
  this.customerService.getCustomers();
  this.customerService.getCustomerUpdateListener()
    .subscribe((customerData: { customers: Customer[] }) => {
      this.customers = customerData.customers;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.filterPredicate = this.tableFilter();
    });
  }
// filter function for table data
tableFilter(): (data: any, filter: string) => boolean {
  const filterFunction = function(data, filter): boolean {
    const searchTerms = JSON.parse(filter);
    return data.firstName.toString().toLowerCase().indexOf(searchTerms.firstName) !== -1
      && data.lastName.toString().toLowerCase().indexOf(searchTerms.lastName) !== -1;
  };
  return filterFunction;
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
    }; // data listed below determines the data passed
    this.dialogCustEditRef = this.dialog.open(DialogCustomerEditComponent, config);
    this.dialogCustEditRef.componentInstance.data = {
      id: data.id,
      customerId: data.customerId,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode

      };
    }
}
