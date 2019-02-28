import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { mimeType } from '../manager-actions/mime-type.validator';
import { MatTabChangeEvent } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-manager-actions',
  templateUrl: './manager-actions.component.html',
  styleUrls: ['./manager-actions.component.css']
})
export class ManagerActionsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  employeeForm: FormGroup;
  @ViewChild('addEmployeeForm') addEmployeeForm: FormGroupDirective;

  scheduleForm: FormGroup;
  @ViewChild('generateScheduleForm') generateScheduleForm: FormGroupDirective;

  tabIndex = 0;

  imagePreview: string;

  private users: any = [];

  ngOnInit() {
    this.employeeForm = new FormGroup({
      'username': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      'password': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      'firstName': new FormControl(null, {validators: [Validators.required]}),
      'lastName': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      'phone': new FormControl(null, {validators: [Validators.required]}),
      'jobRole': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.scheduleForm = new FormGroup({
      'employee': new FormControl(null, {validators: [Validators.required]}),
      'weekOf': new FormControl(null, {validators: [Validators.required]}),
      'sunIn': new FormControl(null),
      'sunOut': new FormControl(null),
      'monIn': new FormControl(null),
      'monOut': new FormControl(null),
      'tueIn': new FormControl(null),
      'tueOut': new FormControl(null),
      'wedIn': new FormControl(null),
      'wedOut': new FormControl(null),
      'thuIn': new FormControl(null),
      'thuOut': new FormControl(null),
      'friIn': new FormControl(null),
      'friOut': new FormControl(null),
      'satIn': new FormControl(null),
      'satOut': new FormControl(null),
    });
    this.userService.getUsers();
    this.userService.getUserUpdateListener()
      .subscribe((userData) => {
        this.users = userData.users;
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.employeeForm.patchValue({image: file});
    this.employeeForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.authService.createUser(
      this.employeeForm.value.username,
      this.employeeForm.value.password,
      this.employeeForm.value.firstName,
      this.employeeForm.value.lastName,
      this.employeeForm.value.email,
      this.employeeForm.value.phone,
      this.employeeForm.value.jobRole,
      this.employeeForm.value.image
    );
    this.employeeForm.reset();
  }

  onGenerateSchedule() {
    if (this.scheduleForm.invalid) {
      return;
    }
    console.log('Form submitted!');
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.tabIndex = tabChangeEvent.index;
  }
}
