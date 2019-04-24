import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerServiceRecord} from '../models/customerServiceRecord.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/customerServiceRecords';


@Injectable({providedIn: 'root'})
export class CustomerServiceRecordService {
  private customerServiceRecords: CustomerServiceRecord[] = [];
  private customerServiceRecordsUpdated = new Subject<{customerServiceRecords: CustomerServiceRecord[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getCustomerServiceRecords() {
    this.http
      .get<{message: string, customerServiceRecords: any}>(
        BACKEND_URL
      )
      .pipe(map((customerServiceRecordData) => {
        return {
          customerServiceRecords: customerServiceRecordData.customerServiceRecords.map(customerServiceRecord => {
            return {
              id: customerServiceRecord._id,
              customerId: customerServiceRecord.customerId,
              vehicleId: customerServiceRecord.vehicleId,
              mileage: customerServiceRecord.mileage,
              servicePerformed: customerServiceRecord.servicePerformed,
              serviceDate: customerServiceRecord.serviceDate,
              dateReturned: customerServiceRecord.dateReturned,
              mechanic: customerServiceRecord.mechanic,
              serviceNotes: customerServiceRecord.serviceNotes,
              servicePrice: customerServiceRecord.servicePrice,
              paymentReceived: customerServiceRecord.paymentReceived
            };
          })
        };
      }))
      .subscribe((transformedCustomerServiceRecordData) => {
        this.customerServiceRecords = transformedCustomerServiceRecordData.customerServiceRecords;
        this.customerServiceRecordsUpdated.next({customerServiceRecords: [...this.customerServiceRecords]});
      });
  }

  getCustomerServiceRecordUpdateListener() {
    return this.customerServiceRecordsUpdated.asObservable();
  }
  //  Find by internal customerId
  getCustomerServiceRecordsByVehicleID(customerId: string) {
    this.http
      .get<{message: string, customerServiceRecords: any}>(
        BACKEND_URL + '/' + customerId
      )
      .pipe(map((customerServiceRecordData) => {
        return {
          customerServiceRecords: customerServiceRecordData.customerServiceRecords.map(customerServiceRecord => {
            return {
              id: customerServiceRecord._id,
              customerId: customerServiceRecord.customerId,
              vehicleId: customerServiceRecord.vehicleId,
              mileage: customerServiceRecord.mileage,
              servicePerformed: customerServiceRecord.servicePerformed,
              serviceDate: customerServiceRecord.serviceDate,
              dateReturned: customerServiceRecord.dateReturned,
              mechanic: customerServiceRecord.mechanic,
              serviceNotes: customerServiceRecord.serviceNotes,
              servicePrice: customerServiceRecord.servicePrice,
              paymentReceived: customerServiceRecord.paymentReceived
            };
          })
        };
      }))
      .subscribe((transformedCustomerServiceRecordData) => {
        this.customerServiceRecords = transformedCustomerServiceRecordData.customerServiceRecords;
        this.customerServiceRecordsUpdated.next({customerServiceRecords: [...this.customerServiceRecords]});
      });
  }
// ADD method for Customer dialog
  addCustomerServiceRecord(
    customerId: string,
    vehicleId: string,
    mileage: string,
    servicePerformed: string,
    serviceDate: string,
    dateReturned: string,
    mechanic: string,
    serviceNotes: string,
    servicePrice: string,
    paymentReceived: string,

  ) {
    const customerServiceRecordData = new FormData();
      customerServiceRecordData.append('customerId', customerId);
      customerServiceRecordData.append('vehicleId', vehicleId);
      customerServiceRecordData.append('mileage', mileage);
      customerServiceRecordData.append('servicePerformed', servicePerformed);
      customerServiceRecordData.append('serviceDate', serviceDate);
      customerServiceRecordData.append('dateReturned', dateReturned);
      customerServiceRecordData.append('mechanic', mechanic);
      customerServiceRecordData.append('serviceNotes', serviceNotes);
      customerServiceRecordData.append('servicePrice', servicePrice);
      customerServiceRecordData.append('paymentReceived', paymentReceived);
    return this.http
      .post<{message: string, customerServiceRecord: CustomerServiceRecord}>(BACKEND_URL, customerServiceRecordData)
      .subscribe((resData) => {
        const customerServiceRecord: CustomerServiceRecord = {
              id: resData.customerServiceRecord.id,
              customerId: customerId,
              vehicleId: vehicleId,
              mileage: mileage,
              servicePerformed: servicePerformed,
              serviceDate: serviceDate,
              dateReturned: dateReturned,
              mechanic: mechanic,
              serviceNotes: serviceNotes,
              servicePrice: servicePrice,
              paymentReceived: paymentReceived

            };
            this.customerServiceRecords.push(customerServiceRecord);
            this.customerServiceRecordsUpdated.next({customerServiceRecords: [...this.customerServiceRecords]});

          });
      }

// UPDATE method for CustomerServiceRecord dialogs
  updateCustomerServiceRecord(
    id: string,
    customerId: string,
    vehicleId: string,
    mileage: string,
    servicePerformed: string,
    serviceDate: string,
    dateReturned: string,
    mechanic: string,
    serviceNotes: string,
    servicePrice: string,
    paymentReceived: string
  ) {
    let customerServiceRecordData: CustomerServiceRecord | FormData;
    customerServiceRecordData = {
      id: id,
      customerId: customerId,
      vehicleId: vehicleId,
      mileage: mileage,
      servicePerformed: servicePerformed,
      serviceDate: serviceDate,
      dateReturned: dateReturned,
      mechanic: mechanic,
      serviceNotes: serviceNotes,
      servicePrice: servicePrice,
      paymentReceived: paymentReceived
    };
      return this.http.put(BACKEND_URL + '/' + id, customerServiceRecordData)
      .subscribe(response => {
        const updatedCustomerServiceRecords = [...this.customerServiceRecords];
        const oldCustomerServiceRecordIndex = updatedCustomerServiceRecords.findIndex(p => p.id === id);
        const customerServiceRecord: CustomerServiceRecord = {
          id: id,
          customerId: customerId,
          vehicleId: vehicleId,
          mileage: mileage,
          servicePerformed: servicePerformed,
          serviceDate: serviceDate,
          dateReturned: dateReturned,
          mechanic: mechanic,
          serviceNotes: serviceNotes,
          servicePrice: servicePrice,
          paymentReceived: paymentReceived
        };
        updatedCustomerServiceRecords[oldCustomerServiceRecordIndex] = customerServiceRecord;
        this.customerServiceRecords = updatedCustomerServiceRecords;
        this.customerServiceRecordsUpdated.next({customerServiceRecords: [...this.customerServiceRecords ]});

      });
    }

    // DELETE method CustomerServiceRecord dialog
  deleteCustomerServiceRecord(idCustomerServiceRecordID: string) {
    console.log('CustomerServiceRecord Deleted! ' + idCustomerServiceRecordID);
    return this.http.delete(BACKEND_URL + '/' + idCustomerServiceRecordID)
      .subscribe(() => {
        // tslint:disable-next-line:max-line-length
        const updatedCustomerServiceRecords = this.customerServiceRecords.filter(customerServiceRecord => customerServiceRecord.id !== idCustomerServiceRecordID);
        this.customerServiceRecords = updatedCustomerServiceRecords;
        this.customerServiceRecordsUpdated.next({customerServiceRecords: [...this.customerServiceRecords]});
      });
    }
}

