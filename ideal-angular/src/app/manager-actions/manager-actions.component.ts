import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { mimeType } from '../manager-actions/mime-type.validator';
import { MatTabChangeEvent } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-manager-actions',
  templateUrl: './manager-actions.component.html',
  styleUrls: ['./manager-actions.component.css']
})
export class ManagerActionsComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  form: FormGroup;
  @ViewChild('employeeForm') employeeForm: FormGroupDirective;

  tabIndex = 0;

  imagePreview: string;

  ngOnInit() {
    this.form = new FormGroup({
      'username': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      'password': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      'firstName': new FormControl(null, {
        validators: [Validators.required]
      }),
      'lastName': new FormControl(null, {
        validators: [Validators.required]
      }),
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      'phone': new FormControl(null, {
        validators: [Validators.required]
      }),
      'jobRole': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddEmployee() {
    if (this.form.invalid) {
      return;
    }
    this.authService.createUser(
      this.form.value.username,
      this.form.value.password,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.email,
      this.form.value.phone,
      this.form.value.jobRole,
      this.form.value.image
    );
    this.form.reset();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.tabIndex = tabChangeEvent.index;
  }
}
