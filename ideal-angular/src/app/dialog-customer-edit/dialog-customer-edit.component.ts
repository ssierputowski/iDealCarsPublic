import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';

import { CustomerService } from '../../services/customer.service';
import { CustomerVehicleService } from '../../services/customerVehicle.service';
import { CustomerServiceRecordService } from '../../services/customerServiceRecord.service';

import { ActivatedRoute } from '@angular/router';
import { mimeType } from '../manager-actions/mime-type.validator';
import { CustomerVehicle } from 'src/models/customerVehicle.model';
import { CustomerServiceRecord } from 'src/models/customerServiceRecord.model';

export interface Car {
  objID: string;
  custID: string;
  carvin: string;
  // miles: string;
  year: string;
  make: string;
  model: string;
  color: string;
  details: string;
  pricePaid: string;
  carPic: string;
}
export interface Record {
  objID: string;
  custID: string;
  carvin: string;
  miles: string;
  service: string;
  date: string;
  returnDate: string;
  mechanic: string;
  note: string;
  price: string;
  payment: string;
}

@Component({
  selector: 'app-dialog-customer-edit',
  templateUrl: './dialog-customer-edit.component.html',
  styleUrls: ['./dialog-customer-edit.component.css']
})

export class DialogCustomerEditComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup;
  tabIndex = 0;
  imagePreview: string;
  customerInfoForm: FormGroup;
  customerVehicleForm: FormGroup;
  customerServiceRecordForm: FormGroup;
  addCustomerVehicleForm: FormGroup;
  addCustomerServiceRecordForm: FormGroup;
  cars: Car[] = [];
  records: Record[] = [];
  filteredRecords: Record[] = [];
  customerVehicles: CustomerVehicle[] = [];
  customerServiceRecords: CustomerServiceRecord[] = [];
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
  vehicleSelector = new FormControl('', { validators: [Validators.required]});
  recordSelector = new FormControl('', { validators: [Validators.required]});
  stateSelector = new FormControl('', { validators: [Validators.required]});
  public edit: boolean;
  public addRecord: boolean;
  public addVehicle: boolean;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,

  private customerServiceRecordService: CustomerServiceRecordService,
  private customerVehicleService: CustomerVehicleService,
  private customerService: CustomerService,

  private dialogRef: MatDialogRef<DialogCustomerEditComponent>,
  private formBuild: FormBuilder,
  private route: ActivatedRoute) {

    this.customerInfoForm = this.formBuild.group({
      'customerId': new FormControl(null, { validators: [Validators.required] }),
      'firstName': new FormControl(null, { validators: [Validators.required, Validators.maxLength(15)] }),
      'lastName': new FormControl(null, { validators: [Validators.required, Validators.maxLength(20)] }),
      'phoneNumber': new FormControl(null, { validators: [Validators.required, Validators.minLength(10)] }),
      'emailAddress': new FormControl(null, { validators: [Validators.required, Validators.email] }),
      'address': new FormControl(null, { validators: [Validators.required, Validators.maxLength(30)] }),
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
      'vehicleModel': new FormControl(null, { validators: [Validators.required, Validators.maxLength(15)] }),
      'vehicleColor': new FormControl(null, { validators: [Validators.required, Validators.maxLength(15)] }),
      'vehicleDetails': new FormControl(null, { validators: [Validators.required, Validators.maxLength(20)] }),
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
      'serviceNotes': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
      // tslint:disable-next-line:max-line-length
      'servicePrice': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
      'paymentReceived': new FormControl(null, { validators: [Validators.required] }),
    });
    // These below for ADDING to record of vehicles
    this.addCustomerVehicleForm = this.formBuild.group({
      // tslint:disable-next-line:max-line-length
      'vehicleId': new FormControl(null, { validators: [Validators.required, Validators.minLength(17), Validators.maxLength(17), Validators.pattern('[A-Za-z0-9]*')] }),
      // tslint:disable-next-line:max-line-length
      'vehicleYear': new FormControl(null, { validators: [Validators.required, Validators.min(1900), Validators.max(2050), Validators.pattern('[0-9]*')] }),
      'vehicleMake': new FormControl(null, { validators: [Validators.required] }),
      'vehicleModel': new FormControl(null, { validators: [Validators.required] }),
      'vehicleColor': new FormControl(null, { validators: [Validators.required] }),
      'vehicleDetails': new FormControl(null, { validators: [Validators.required] }),
      // tslint:disable-next-line:max-line-length
      'vehiclePriceSold': new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(20000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
      'vehicleImage': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    });
    // These below for ADDING to record on customer
    this.addCustomerServiceRecordForm = this.formBuild.group({
      'vehicleId': new FormControl(null, { validators: [Validators.required] }),
      // tslint:disable-next-line:max-line-length
      'mileage': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(20000000), Validators.pattern('[0-9]*')] }),
      'servicePerformed': new FormControl(null, { validators: [Validators.required] }),
      'serviceDate': new FormControl(null, { validators: [Validators.required] }),
      'dateReturned': new FormControl(null, { validators: [Validators.required] }),
      'mechanic': new FormControl(null, { validators: [Validators.required] }),
      'serviceNotes': new FormControl(null, { validators: [Validators.required] }),
      // tslint:disable-next-line:max-line-length
      'servicePrice': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(20000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
      'paymentReceived': new FormControl(null, { validators: [Validators.required] }),
    });
  }

  ngOnInit() {

    // console.log(this.data);
    this.stateSelector.setValue(this.data.state || this.stateSelector.markAsPristine);
    this.displayCustomerVehicles(this.data.customerId);
    this.displayCustomerVehicleRecords(this.data.customerId);
    this.vehicleSelector.valueChanges.subscribe(value => {
      // console.log(value);
      value = this.vehicleSelector.value.carvin;
      this.filteredRecords = this.records.filter(function(record) {
        return record.carvin === value;
      });
      this.customerServiceRecordForm.reset();
      this.recordSelector.setValue(this.filteredRecords[0] || this.recordSelector.markAsPristine);
    });
    // console.log(this.filteredRecords);
    // console.log(this.records);
    // console.log(this.cars);


    this.route.params.subscribe(
      param => {
        this.customerInfoForm.patchValue({customerId: this.data.customerId});
        this.customerInfoForm.patchValue({firstName: this.data.firstName});
        this.customerInfoForm.patchValue({lastName: this.data.lastName});
        this.customerInfoForm.patchValue({phoneNumber: this.data.phoneNumber});
        this.customerInfoForm.patchValue({emailAddress: this.data.emailAddress});
        this.customerInfoForm.patchValue({address: this.data.address});
        this.customerInfoForm.patchValue({city: this.data.city});
        this.customerInfoForm.patchValue({state: this.data.state});
        this.customerInfoForm.patchValue({zipCode: this.data.zipCode});

      this.vehicleSelector.valueChanges.subscribe(value => {
        value.carvin = this.vehicleSelector.value.carvin;
        value.year = this.vehicleSelector.value.year;
        value.make = this.vehicleSelector.value.make;
        value.model = this.vehicleSelector.value.model;
        value.color = this.vehicleSelector.value.color;
        value.details = this.vehicleSelector.value.details;
        value.pricePaid = this.vehicleSelector.value.pricePaid;
        value.carPic = this.vehicleSelector.value.carPic;

        this.customerVehicleForm.patchValue({vehicleId: value.carvin});
        this.customerVehicleForm.patchValue({vehicleYear: value.year});
        this.customerVehicleForm.patchValue({vehicleMake: value.make});
        this.customerVehicleForm.patchValue({vehicleModel: value.model});
        this.customerVehicleForm.patchValue({vehicleColor: value.color});
        this.customerVehicleForm.patchValue({vehicleDetails: value.details});
        this.customerVehicleForm.patchValue({vehiclePriceSold:  value.pricePaid});
        this.customerVehicleForm.patchValue({vehicleImage:  value.carPic});
      });

      this.recordSelector.valueChanges.subscribe(value => {
        value.carvin = this.recordSelector.value.carvin,
        value.miles = this.recordSelector.value.miles,
        value.service = this.recordSelector.value.service,
        value.date = this.recordSelector.value.date,
        value.returnDate = this.recordSelector.value.returnDate,
        value.mechanic = this.recordSelector.value.mechanic,
        value.note = this.recordSelector.value.note,
        value.price = this.recordSelector.value.price,
        value.payment = this.recordSelector.value.payment,

        this.customerServiceRecordForm.patchValue({vehicleId:  value.carvin});
        this.customerServiceRecordForm.patchValue({mileage: value.miles});
        this.customerServiceRecordForm.patchValue({servicePerformed: value.service});
        this.customerServiceRecordForm.patchValue({serviceDate: value.date});
        this.customerServiceRecordForm.patchValue({dateReturned:  value.returnDate});
        this.customerServiceRecordForm.patchValue({mechanic:  value.mechanic});
        this.customerServiceRecordForm.patchValue({serviceNotes: value.note});
        this.customerServiceRecordForm.patchValue({servicePrice: value.price});
        this.customerServiceRecordForm.patchValue({paymentReceived: value.payment});
      });
  });
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
  // Image selection Function
  addOnImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addCustomerVehicleForm.patchValue({vehicleImage: file});
    this.addCustomerVehicleForm.get('vehicleImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  // fires tabchange index print statement
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex = tabChangeEvent.index;
    console.log('index => ', tabChangeEvent.index);
  }
  // Cancel button to clear vehicle and record arrays
  close() {
    this.records.length = 0;
    this.cars.length = 0;
   // this.dialogRef.close();
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
  getGENErrorMessage() {
    return  'FIELD REQUIRED!';
  }
  getEMAILErrorMessage() {
    return  'EMAIL must be a valid email!';
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
  getDATEErrorMessage() {
    return  'DATE must be in format 00/00/0000 !';
  }
/* ==================================================================================THESE ARE ADD METHODS */
// ADD customer vehicle to dB referencing customerId
addCustomerVehicle() {
  if (this.tabIndex === 1) {
      this.addCustomerVehicleForm.patchValue({customerId: this.data.customerId});
  }
}
// Saves ADDed customer vehicle to dB
  saveAddedCustomerVehicle() {
    this.customerVehicleService.addCustomerVehicle(
      this.data.customerId,
      this.addCustomerVehicleForm.get('vehicleId').value,
      this.addCustomerVehicleForm.get('vehicleYear').value,
      this.addCustomerVehicleForm.get('vehicleMake').value,
      this.addCustomerVehicleForm.get('vehicleModel').value,
      this.addCustomerVehicleForm.get('vehicleColor').value,
      this.addCustomerVehicleForm.get('vehicleDetails').value,
      this.addCustomerVehicleForm.get('vehiclePriceSold').value,
      this.addCustomerVehicleForm.get('vehicleImage').value
    );
  }
   // ADD customer vehicle record to dB referencing customerId
   addCustomerVehicleServiceRecord() {
    if (this.tabIndex === 2) {
        this.addCustomerServiceRecordForm.patchValue({customerId: this.data.customerId});
        this.addCustomerServiceRecordForm.patchValue({vehicleId: this.vehicleSelector.value.carvin});
    }
  }

  // Saves ADDed customer vehicle service record to dB
  saveAddedCustomerVehicleServiceRecord() {
    this.customerServiceRecordService.addCustomerServiceRecord(
      this.data.customerId,
      this.addCustomerServiceRecordForm.get('vehicleId').value,
      this.addCustomerServiceRecordForm.get('mileage').value,
      this.addCustomerServiceRecordForm.get('servicePerformed').value,
      this.addCustomerServiceRecordForm.get('serviceDate').value,
      this.addCustomerServiceRecordForm.get('dateReturned').value,
      this.addCustomerServiceRecordForm.get('mechanic').value,
      this.addCustomerServiceRecordForm.get('serviceNotes').value,
      this.addCustomerServiceRecordForm.get('servicePrice').value,
      this.addCustomerServiceRecordForm.get('paymentReceived').value,
    );
  }
  /* ==================================================================================THESE ARE EDIT METHODS */

  // Saves customer info only
  saveEditedCustomerONLY() {
    if (this.customerInfoForm.invalid) {
      return;
    }
    this.customerService.updateCustomer(
      this.data.id,
      this.customerInfoForm.get('customerId').value,
      this.customerInfoForm.get('firstName').value,
      this.customerInfoForm.get('lastName').value,
      this.customerInfoForm.get('phoneNumber').value,
      this.customerInfoForm.get('emailAddress').value,
      this.customerInfoForm.get('address').value,
      this.customerInfoForm.get('city').value,
      this.customerInfoForm.get('state').value,
      this.customerInfoForm.get('zipCode').value,
    );
  }
  // Saves edited customer vehicle info only
  saveEditedCustomerVehicleONLY () {
    this.customerVehicleService.updateCustomerVehicle(
      this.vehicleSelector.value.objID,
      this.vehicleSelector.value.custID,
      this.customerVehicleForm.get('vehicleId').value,
      this.customerVehicleForm.get('vehicleYear').value,
      this.customerVehicleForm.get('vehicleMake').value,
      this.customerVehicleForm.get('vehicleModel').value,
      this.customerVehicleForm.get('vehicleColor').value,
      this.customerVehicleForm.get('vehicleDetails').value,
      this.customerVehicleForm.get('vehiclePriceSold').value,
      this.customerVehicleForm.get('vehicleImage').value,
    );
  }
  // Saves edited customer service record info only
  saveEditedCustomerServiceRecordONLY() {
    this.customerServiceRecordService.updateCustomerServiceRecord(
      this.recordSelector.value.objID,
      this.recordSelector.value.custID,
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
  }
  // Saves customer data edited: one vehicle and one record at a time
  saveEditedCustomerALL() {
    if (this.customerInfoForm.invalid || this.customerVehicleForm.invalid || this.customerServiceRecordForm.invalid) {
      return;
    }
    this.customerService.updateCustomer(
      this.data.id,
      this.customerInfoForm.get('customerId').value,
      this.customerInfoForm.get('firstName').value,
      this.customerInfoForm.get('lastName').value,
      this.customerInfoForm.get('phoneNumber').value,
      this.customerInfoForm.get('emailAddress').value,
      this.customerInfoForm.get('address').value,
      this.customerInfoForm.get('city').value,
      this.customerInfoForm.get('state').value,
      this.customerInfoForm.get('zipCode').value,
    );
    this.customerVehicleService.updateCustomerVehicle(
      this.vehicleSelector.value.objID,
      this.vehicleSelector.value.custID,
      this.customerVehicleForm.get('vehicleId').value,
      this.customerVehicleForm.get('vehicleYear').value,
      this.customerVehicleForm.get('vehicleMake').value,
      this.customerVehicleForm.get('vehicleModel').value,
      this.customerVehicleForm.get('vehicleColor').value,
      this.customerVehicleForm.get('vehicleDetails').value,
      this.customerVehicleForm.get('vehiclePriceSold').value,
      this.customerVehicleForm.get('vehicleImage').value,
    );
    this.customerServiceRecordService.updateCustomerServiceRecord(
      this.recordSelector.value.objID,
      this.recordSelector.value.custID,
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
 }

 /* ==================================================================================THESE ARE GETTERS METHODS */
 // get all customer vehicle method for testing ONLY
 getCars(): void {
  this.customerVehicleService.getCustomerVehicles();
  this.customerVehicleService.getCustomerVehicleUpdateListener()
    .subscribe((customerVehicleData: { customerVehicles: CustomerVehicle[] }) => {
      this.customerVehicles = customerVehicleData.customerVehicles;
      console.log(this.customerVehicles);
    });
}

 // retrieves vehicles owned by customer
 displayCustomerVehicles(customerId: string): void {
   this.cars.length = 0;
   this.customerVehicleService.getCustomerVehiclesByCustomerID(customerId);
   this.customerVehicleService.getCustomerVehicleUpdateListener()
   .subscribe((customerVehicleData: { customerVehicles: CustomerVehicle[] }) => {
      this.customerVehicles = customerVehicleData.customerVehicles;
      this.customerVehicles.map(customerVehicle => {
        this.cars.push(
          { objID: customerVehicle.id,
            custID: customerVehicle.customerId,
            carvin: customerVehicle.vehicleId,
            year: customerVehicle.vehicleYear,
            make: customerVehicle.vehicleMake,
            model: customerVehicle.vehicleModel,
            color: customerVehicle.vehicleColor,
            details: customerVehicle.vehicleDetails,
            pricePaid: customerVehicle.vehiclePriceSold,
            carPic: customerVehicle.vehicleImage
          });
      });
    });
  }

 // retrieves records of vehicles owned by customer
 displayCustomerVehicleRecords(customerId: string): void {
  this.customerServiceRecordService.getCustomerServiceRecordsByVehicleID(customerId);
  this.customerServiceRecordService.getCustomerServiceRecordUpdateListener()
  .subscribe((customerServiceRecordData: { customerServiceRecords: CustomerServiceRecord[] }) => {
     this.customerServiceRecords = customerServiceRecordData.customerServiceRecords;
     this.customerServiceRecords.map(customerServiceRecord => {
        this.records.push(
          { objID: customerServiceRecord.id,
            custID: customerServiceRecord.customerId,
            carvin: customerServiceRecord.vehicleId,
            miles: customerServiceRecord.mileage,
            service: customerServiceRecord.servicePerformed,
            date: customerServiceRecord.serviceDate,
            returnDate: customerServiceRecord.dateReturned,
            mechanic: customerServiceRecord.mechanic,
            note: customerServiceRecord.serviceNotes,
            price: customerServiceRecord.servicePrice,
            payment: customerServiceRecord.paymentReceived
          });
        });
    });
  }

  /* ==================================================================================THESE ARE DELETE METHODS */

  // Delete ALL entire record method for dialog going to need multiple id here from data
  onDelete(customerobjId: string) {
    this.records.forEach(record => {
      const REC = record.objID;
      this.customerServiceRecordService.deleteCustomerServiceRecord(REC);
      });
    this.cars.forEach(car => {
      const carNUM = car.objID;
      this.customerVehicleService.deleteCustomerVehicle(carNUM);
      });
    this.customerService.deleteCustomer(customerobjId);
  }

  // Individual CustomerVehicleDelete
  onVehicleDelete() {
    if (this.filteredRecords.length > 0) {
      this.filteredRecords.forEach(record => {
        const REC = record.objID;
        this.customerServiceRecordService.deleteCustomerServiceRecord(REC);
        });
    }
    this.customerVehicleService.deleteCustomerVehicle(this.vehicleSelector.value.objID);
  }

  // Individual Record delete
  onRecordDelete() {
    this.customerServiceRecordService.deleteCustomerServiceRecord(this.recordSelector.value.objID);
  }
  ngOnDestroy() {
    console.log('destroyed');
  }
  setEdit() {
    this.edit = true;
  }
  unSetEdit() {
    this.edit = false;
  }
  setAddRecord() {
    this.addRecord = true;
  }
  unSetAddRecord() {
    this.addRecord = false;
  }
  setAddVehicle() {
    this.addVehicle = true;
  }
  unSetAddVehicle() {
    this.addVehicle = false;
  }
}
