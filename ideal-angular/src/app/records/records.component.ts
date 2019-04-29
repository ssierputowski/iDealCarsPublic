import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from '../../models/customer.model';
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
  // formControls for search filters
  FName = new FormControl('');
  LName = new FormControl('');


  ngOnInit() {

    this.titleService.setTitle('Customer Records | iDealCars');
    // below subscribe to value changes of the search Filter formControls and filter the
    // table dataSource cooresponding to the values entered in the filter formControls
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

// returns observable of the customers for the records page stored in the db
// last line applies filter function below filterPredicate to datasource and causes to
// display those results in the table
getCustomer(): void {
  this.customerService.getCustomers();
  this.customerService.getCustomerUpdateListener()
    .subscribe((customerData: { customers: Customer[] }) => {
      this.customers = customerData.customers;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.filterPredicate = this.tableFilter();
    });
  }

// filter function for table data-filters results contained in the column attributes
// converts them to string lowercase to  return a result and in combination with the
// formControls above ignores case
tableFilter(): (data: any, filter: string) => boolean {
  const filterFunction = function(data, filter): boolean {
    const searchTerms = JSON.parse(filter);
    return data.firstName.toString().toLowerCase().indexOf(searchTerms.firstName) !== -1
      && data.lastName.toString().toLowerCase().indexOf(searchTerms.lastName) !== -1;
  };
  return filterFunction;
}

  // opens dialog to enter a new customer, customerVehicle, customerServiceRecord to the records page
  openDialogEntry() {
    this.dialogEntryRef = this.dialog.open(DialogEntryCustomerComponent, {
      disableClose: true,
      minWidth: '50rem',
      height: '75rem',
    });
  }

  print(id: string) {
    alert(id);
  }

  // opens dialog for editing customer, customerVehicle, customerServiceRecord entry already contained in the table,
  // passing the customer data in that row to the edit dialog
  openCustEdit(data: any) {
    const config: MatDialogConfig = {
      disableClose: true,
      minWidth: '50rem',
      height: '75rem',
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
