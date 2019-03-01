import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Customer } from '../../models/customer.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-entry-customer',
  templateUrl: './dialog-entry-customer.component.html',
  styleUrls: ['./dialog-entry-customer.component.css']
})
export class DialogEntryCustomerComponent implements OnInit {

  customers: Customer[] = [];
  totalCustomers = 0;
  private customersSub: Subscription;

  isLoading = false;
  checked = false;

  customerform: FormGroup;
  @ViewChild('addCustomerForm') addCustomerForm: FormGroupDirective;

  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<DialogEntryCustomerComponent>,
    private formBuild: FormBuilder
   ) {}

  ngOnInit() {
      if (this.checked) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    this.customerform = this.formBuild.group({
      'firstName': new FormControl(null, {
        validators: [Validators.required]
      }),
      'lastName': new FormControl(null, {
        validators: [Validators.required]
      }),
      'phoneNumber': new FormControl(null, {
        validators: [Validators.required]
      }),
      'email': new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.customerService.getCustomers();
    this.customersSub = this.customerService.getCustomerUpdateListener()
      .subscribe((customerData: { customers: Customer[] }) => {
        this.customers = customerData.customers;
      });
  }

  saveCustomer() {
    if (this.customerform.invalid) {
      return;
    }
    this.customerService.addCustomer(
      this.customerform.value.firstName,
      this.customerform.value.lastName,
      this.customerform.value.phoneNumber,
      this.customerform.value.email,
    );
    this.customerform.reset();

  }

  /* closes 'Add Customer Inventory' form */
  close() {
    this.dialogRef.close();

  }
}
