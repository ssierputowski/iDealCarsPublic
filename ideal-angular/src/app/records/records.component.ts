import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../models/customer.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(
    private titleService: Title
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
    }
  ];

  dataSource = new MatTableDataSource(this.customerData);

  ngOnInit() {
    this.titleService.setTitle('Customer Records | iDealCars');
  }

  print(id: string) {
    alert(id);
  }
}
