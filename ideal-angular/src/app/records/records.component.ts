import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../models/customer.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { DialogEntryCustomerComponent } from '../dialog-entry-customer/dialog-entry-customer.component';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {

  dialogEntryRef: MatDialogRef<DialogEntryCustomerComponent>;
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
    'vehicleYear',
    'vehicleMake',
    'vehicleModel',
    'vehicleColor',
    'customerRecords'
  ];

  customerData = [
    {
      customerId: '1023045',
      firstName: 'Jerrod',
      lastName: 'Mathis',
      vehicleInfo: [
        {
          vehicleYear: 1999,
          vehicleMake: 'Toyota',
          vehicleModel: '4runner',
          vehicleColor: 'White',
          vehicleId: 'TBA10190ASASDF',
          vehicleDetails: '',
          vehicleImage: ''
        },
      ],
      phone: '(843) 323-7261',
      email: 'jerrodmathis95@gmail.com',
      serviceRecords: [
        {
          servicePerformed: 'Ball joints replaced',
          serviceDate: '01-31-2019',
          dateReturned: '02-01-2019',
          whoPerformed: 'Chris Matthews',
          serviceNotes: '',
          servicePrice: 1329.00,
          paymentReceived: true
        }
      ]
    },
    {
      customerId: '1',
      firstName: 'Sagar',
      lastName: 'Patadia',
      vehicleInfo: [
        {
          vehicleYear: 2016,
          vehicleMake: 'Mercedes Benz',
          vehicleModel: 'C300',
          vehicleColor: 'Gray',
          vehicleId: 'TBA39273SDPSDP',
          vehicleDetails: '',
          vehicleImage: ''
        },
      ],
      phone: '(540) 278-0679',
      email: 'spatadia@email.sc.edu',
      serviceRecords: [
        {
          servicePerformed: 'Oil Change',
          serviceDate: '01-31-2019',
          dateReturned: '02-01-2019',
          whoPerformed: 'Chris Matthews',
          serviceNotes: '',
          servicePrice: 100.00,
          paymentReceived: true
        }
      ]
    },
    {
      customerId: '2',
      firstName: 'John',
      lastName: 'Doe',
      vehicleInfo: [
        {
          vehicleYear: 2005,
          vehicleMake: 'Honda',
          vehicleModel: 'Accord',
          vehicleColor: 'Black',
          vehicleId: 'TBA10382AKSHDK',
          vehicleDetails: '',
          vehicleImage: ''
        },
      ],
      phone: '(555) 372-2928',
      email: 'johndoe@boeing.com',
      serviceRecords: [
        {
          servicePerformed: 'Ball joints replaced',
          serviceDate: '01-31-2019',
          dateReturned: '02-01-2019',
          whoPerformed: 'Chris Matthews',
          serviceNotes: '',
          servicePrice: 1329.00,
          paymentReceived: true
        }
      ]
    },
    {
      customerId: '3',
      firstName: 'Steve',
      lastName: 'Perdue',
      vehicleInfo: [
        {
          vehicleYear: 2011,
          vehicleMake: 'Acura',
          vehicleModel: 'RDX',
          vehicleColor: 'Blue',
          vehicleId: 'TBA29627ASDQOW',
          vehicleDetails: '',
          vehicleImage: ''
        },
      ],
      phone: '(803) 183-2847',
      email: 'steveiscool@yahoo.com',
      serviceRecords: [
        {
          servicePerformed: 'Ball joints replaced',
          serviceDate: '01-31-2019',
          dateReturned: '02-01-2019',
          whoPerformed: 'Chris Matthews',
          serviceNotes: '',
          servicePrice: 1329.00,
          paymentReceived: true
        }
      ]
    },
    {
      customerId: '5',
      firstName: 'Matthew',
      lastName: 'Mathis',
      vehicleInfo: [
        {
          vehicleYear: 2015,
          vehicleMake: 'Jaguar',
          vehicleModel: 'F Type',
          vehicleColor: 'Orange',
          vehicleId: 'TBA37293KFJDKE',
          vehicleDetails: '',
          vehicleImage: ''
        },
      ],
      phone: '(540) 803-2018',
      email: 'Matthew@Mathis.com',
      serviceRecords: [
        {
          servicePerformed: 'Ball joints replaced',
          serviceDate: '01-31-2019',
          dateReturned: '02-01-2019',
          whoPerformed: 'Chris Matthews',
          serviceNotes: '',
          servicePrice: 1329.00,
          paymentReceived: true
        }
      ]
    },
  ];

  // dataSource = new MatTableDataSource(this.customerData);

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
    'customerId': new FormControl(null, {
      validators: [Validators.required]
    }),
    'firstName': new FormControl(null, {
      validators: [Validators.required]
    }),
    'lastName': new FormControl(null, {
      validators: [Validators.required]
    }),
    'phoneNumber': new FormControl(null, {
      validators: [Validators.required]
    }),
    'email' : new FormControl (null, {
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
      hasBackdrop: true,
      autoFocus: true,
      disableClose: false,
      width: '350px',
      height: 'auto'
    });
  }

  print(id: string) {
    alert(id);
  }
}
