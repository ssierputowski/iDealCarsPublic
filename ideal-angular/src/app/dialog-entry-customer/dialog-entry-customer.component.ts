import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Customer } from '../../models/customer.model';
import { CustomerVehicle } from '../../models/customerVehicle.model';
import { CustomerServiceRecord} from '../../models/customerServiceRecord.model';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { CustomerVehicleService } from '../../services/customerVehicle.service';
import { CustomerServiceRecordService } from '../../services/customerServiceRecord.service';
import { VehicleService } from '../../services/vehicle.service';

import { Subscription } from 'rxjs';
import { mimeType } from '../manager-actions/mime-type.validator';

export interface Cust {
  IDcust: string;
  first: string;
  last: string;
  phone: string;
  emailA: string;
  street: string;
  town: string;
  st: string;
  zip: string;
}
@Component({
  selector: 'app-dialog-entry-customer',
  templateUrl: './dialog-entry-customer.component.html',
  styleUrls: ['./dialog-entry-customer.component.css']
})
export class DialogEntryCustomerComponent implements OnInit {
  first: string;
  last: string;
  cellNum: string;
  custID: string;
  imagePreview: string;
  customerInfoForm: FormGroup;
  customerVehicleForm: FormGroup;
  customerServiceRecordForm: FormGroup;
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  payStatus: string[] = [
    'Awaiting Payment', 'Paid In Full'
  ];
  customers: Customer[] = [];
  custs: Cust[] = [];
  totalCustomers = 0;
  private customersSub: Subscription;
  customerSelector = new FormControl('', { validators: [Validators.required]});
  pulledFromInventory = false;
  checked = false;

  customerform: FormGroup;
  // @ViewChild('addCustomerForm') addCustomerForm: FormGroupDirective;
  public currentCust = false;
  constructor(
    private customerServiceRecordService: CustomerServiceRecordService,
    private customerVehicleService: CustomerVehicleService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogEntryCustomerComponent>,
    private formBuild: FormBuilder,
    private route: ActivatedRoute
   ) {
    this.customerInfoForm = this.formBuild.group({
      'firstName': new FormControl(null, { validators: [Validators.required, Validators.maxLength(15)] }),
      'lastName': new FormControl(null, { validators: [Validators.required, Validators.maxLength(20)] }),
      'phoneNumber': new FormControl(null, { validators: [Validators.required, Validators.minLength(10)] }),
      'emailAddress': new FormControl(null, { validators: [Validators.required, Validators.email] }),
      'address': new FormControl(null, { validators: [Validators.required, Validators.maxLength(50)] }),
      'city': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
      'state': new FormControl(null, { validators: [Validators.required] }),
      // tslint:disable-next-line:max-line-length
      'zipCode': new FormControl(null, { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.max(99999), Validators.pattern('[0-9]*')] }),
    });
    this.customerVehicleForm = this.formBuild.group({
      // tslint:disable-next-line:max-line-length
      'vehicleId': new FormControl(null, { validators: [Validators.required, Validators.minLength(17), Validators.maxLength(17), Validators.pattern('[A-Za-z0-9]*')] }),
      // tslint:disable-next-line:max-line-length
      'vehicleYear': new FormControl(null, { validators: [Validators.required, Validators.min(1900), Validators.max(2050), Validators.pattern('[0-9]*')] }),
      'vehicleMake': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
      'vehicleModel': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
      'vehicleColor': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
      'vehicleDetails': new FormControl(null, { validators: [Validators.required, Validators.maxLength(50)] }),
      // tslint:disable-next-line:max-line-length
      'vehiclePriceSold': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
      'vehicleImage': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    });
    this.customerServiceRecordForm = this.formBuild.group({
      'vehicleId': new FormControl(null, { validators: [Validators.required] }),
      // tslint:disable-next-line:max-line-length
      'mileage': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern('[0-9]*')] }),
      'servicePerformed': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
      'serviceDate': new FormControl(null, { validators: [Validators.required] }),
      'dateReturned': new FormControl(null, { validators: [Validators.required] }),
      'mechanic': new FormControl(null, { validators: [Validators.required, Validators.maxLength(15)] }),
      'serviceNotes': new FormControl(null, { validators: [Validators.required, Validators.maxLength(50)] }),
      // tslint:disable-next-line:max-line-length
      'servicePrice': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
      'paymentReceived': new FormControl(null, { validators: [Validators.required] }),
    });
   }

  ngOnInit() {
    if (this.data) {
      this.getCustomer();
      this.route.params.subscribe(
        param => {

          this.customerSelector.valueChanges.subscribe(value => {
            value.first = this.customerSelector.value.first;
            value.last = this.customerSelector.value.last;
            value.phone = this.customerSelector.value.phone;
            value.emailA = this.customerSelector.value.emailA;
            value.street = this.customerSelector.value.street;
            value.town = this.customerSelector.value.town;
            value.st = this.customerSelector.value.st;
            value.zip = this.customerSelector.value.zip;

            this.customerInfoForm.patchValue({firstName: value.first});
            this.customerInfoForm.patchValue({lastName: value.last});
            this.customerInfoForm.patchValue({phoneNumber: value.phone});
            this.customerInfoForm.patchValue({emailAddress: value.emailA});
            this.customerInfoForm.patchValue({address: value.street});
            this.customerInfoForm.patchValue({city: value.town});
            this.customerInfoForm.patchValue({state: value.st });
            this.customerInfoForm.patchValue({zipCode: value.zip});
          });

          this.customerVehicleForm.patchValue({vehicleId: this.data.vehVin});
          this.customerVehicleForm.patchValue({vehicleYear: this.data.vehYear});
          this.customerVehicleForm.patchValue({vehicleMake: this.data.vehMake});
          this.customerVehicleForm.patchValue({vehicleModel: this.data.vehModel});
          this.customerVehicleForm.patchValue({vehicleColor: this.data.vehColor});
          this.customerVehicleForm.patchValue({vehicleDetails: this.data.vehDetail});
          this.customerVehicleForm.patchValue({vehicleMiles: this.data.vehMiles});
          this.customerVehicleForm.patchValue({vehiclePriceSold: this.data.vehPrice});

          this.customerServiceRecordForm.patchValue({vehicleId: this.data.vehVin});

        }
      );
    }
  this.customerVehicleForm.valueChanges.subscribe(val => {
    val = this.customerVehicleForm.get('vehicleId').value;
    this.customerServiceRecordForm.patchValue({vehicleId: val});
  });
}
  // Customer data to keep track of current customers
  getCustomer(): void {
    this.customerService.getCustomers();
    this.customerService.getCustomerUpdateListener()
      .subscribe((customerData: { customers: Customer[] }) => {
        this.customers = customerData.customers;
        this.customers.map(customer => {
          this.custs.push(
            { IDcust: customer.customerId,
              first: customer.firstName,
              last: customer.lastName,
              phone: customer.phoneNumber,
              emailA: customer.emailAddress,
              street: customer.address,
              town: customer.city,
              st: customer.state,
              zip: customer.zipCode
          });
        });
      });
    }

  saveCustomer() {
    if (this.customerInfoForm.invalid || this.customerVehicleForm.invalid || this.customerServiceRecordForm.invalid) {
      console.log(this.createCustomerID());

      return;
    }
    if (this.data) { this.pulledFromInventory = true; }

    this.customerService.addCustomer(
      this.createCustomerID(),
      this.customerInfoForm.get('firstName').value,
      this.customerInfoForm.get('lastName').value,
      this.customerInfoForm.get('phoneNumber').value,
      this.customerInfoForm.get('emailAddress').value,
      this.customerInfoForm.get('address').value,
      this.customerInfoForm.get('city').value,
      this.customerInfoForm.get('state').value,
      this.customerInfoForm.get('zipCode').value,
    );
    this.customerVehicleService.addCustomerVehicle(
      this.createCustomerID(),
      this.customerVehicleForm.get('vehicleId').value,
      this.customerVehicleForm.get('vehicleYear').value,
      this.customerVehicleForm.get('vehicleMake').value,
      this.customerVehicleForm.get('vehicleModel').value,
      this.customerVehicleForm.get('vehicleColor').value,
      this.customerVehicleForm.get('vehicleDetails').value,
      this.customerVehicleForm.get('vehiclePriceSold').value,
      this.customerVehicleForm.get('vehicleImage').value,
    );
    this.customerServiceRecordService.addCustomerServiceRecord(
      this.createCustomerID(),
      this.customerServiceRecordForm.get('vehicleId').value,
      this.customerServiceRecordForm.get('mileage').value,
      this.customerServiceRecordForm.get('servicePerformed').value,
      this.customerServiceRecordForm.get('serviceDate').value,
      this.customerServiceRecordForm.get('dateReturned').value,
      this.customerServiceRecordForm.get('mechanic').value,
      this.customerServiceRecordForm.get('serviceNotes').value,
      this.customerServiceRecordForm.get('servicePrice').value,
      this.customerServiceRecordForm.get('paymentReceived').value,
    );
    if (this.pulledFromInventory) {
      this.vehicleService.deleteVehicle(this.data.id);
    }
    this.dialogRef.close();
 }
 // save if current customer is buying vehicle
 saveCurrentCustomer() {
  if (this.customerInfoForm.invalid || this.customerVehicleForm.invalid || this.customerServiceRecordForm.invalid) {
    console.log(this.createCustomerID());

    return;
  }
  if (this.data) { this.pulledFromInventory = true; }

  this.customerVehicleService.addCustomerVehicle(
    this.createCustomerID(),
    this.customerVehicleForm.get('vehicleId').value,
    this.customerVehicleForm.get('vehicleYear').value,
    this.customerVehicleForm.get('vehicleMake').value,
    this.customerVehicleForm.get('vehicleModel').value,
    this.customerVehicleForm.get('vehicleColor').value,
    this.customerVehicleForm.get('vehicleDetails').value,
    this.customerVehicleForm.get('vehiclePriceSold').value,
    this.customerVehicleForm.get('vehicleImage').value,
  );
  this.customerServiceRecordService.addCustomerServiceRecord(
    this.createCustomerID(),
    this.customerServiceRecordForm.get('vehicleId').value,
    this.customerServiceRecordForm.get('mileage').value,
    this.customerServiceRecordForm.get('servicePerformed').value,
    this.customerServiceRecordForm.get('serviceDate').value,
    this.customerServiceRecordForm.get('dateReturned').value,
    this.customerServiceRecordForm.get('mechanic').value,
    this.customerServiceRecordForm.get('serviceNotes').value,
    this.customerServiceRecordForm.get('servicePrice').value,
    this.customerServiceRecordForm.get('paymentReceived').value,
  );
  if (this.pulledFromInventory) {
    this.vehicleService.deleteVehicle(this.data.id);
  }
  this.dialogRef.close();
}

  // method creates customerId from first, last names and number
  createCustomerID() {
    this.first = this.customerInfoForm.get('firstName').value;
    this.last = this.customerInfoForm.get('lastName').value;
    this.cellNum = this.customerInfoForm.get('phoneNumber').value;
    this.custID =
    this.first.charAt(0) +
    this.last.charAt(0) +
    this.last.charAt(1) +
    this.last.charAt(2) +
    this.cellNum.charAt(6) +
    this.cellNum.charAt(7) +
    this.cellNum.charAt(8) +
    this.cellNum.charAt(9);

    return this.custID;
  }
  // Image selection Function
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.customerVehicleForm.patchValue({vehicleImage: file});
    this.customerVehicleForm.get('vehicleImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
   // ERROR Messaging=======================================
   getVINErrorMessage() {
    return  'VIN must be 17 letters, numbers in length!';
  }
  getYEARErrorMessage() {
    return  'YEAR must be between 1900-2050!';
  }
  getPRICEErrorMessage() {
    return  'PRICE must be a number of format 0.00 less than 20,000,000.00!';
  }
  getMILEAGEErrorMessage() {
    return  'MILEAGE must be a number less than 20,000,000!';
  }
  getZIPErrorMessage() {
    return  'ZIPCODE must be a 5 digit number!';
  }
  getPHONEErrorMessage() {
    return  'PHONENUMBER must be a 10 digit number!';
  }
  getSERVICEErrorMessage() {
    return  'SERVICE FORM must be filled out, all vehicles checked before sold, put NA or Current Condition if applicable!';
  }
  getGENErrorMessage() {
    return  'FIELD REQUIRED!';
  }
  getEMAILErrorMessage() {
    return  'EMAIL must be a valid email!';
  }
  getDATEErrorMessage() {
    return  'DATE must be in format 00/00/0000 !';
  }

  /* closes 'Add Customer Inventory' form */
  close() {
    this.dialogRef.close();

  }
  setCurrentCustomer() {
    this.currentCust = true;
  }
}
