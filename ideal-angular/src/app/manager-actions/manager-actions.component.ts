import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { mimeType } from '../manager-actions/mime-type.validator';
import { MatTabChangeEvent } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { UserService } from 'src/services/user.service';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-manager-actions',
  templateUrl: './manager-actions.component.html',
  styleUrls: ['./manager-actions.component.css']
})
export class ManagerActionsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  employeeForm: FormGroup;
  @ViewChild('addEmployeeForm') addEmployeeForm: FormGroupDirective;

  scheduleForm: FormGroup;
  @ViewChild('generateScheduleForm') generateScheduleForm: FormGroupDirective;

  messageForm: FormGroup;
  @ViewChild('postMessageForm') postMessageForm: FormGroupDirective;

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
      'sunIn': new FormControl('OFF'),
      'sunOut': new FormControl('OFF'),
      'monIn': new FormControl('OFF'),
      'monOut': new FormControl('OFF'),
      'tueIn': new FormControl('OFF'),
      'tueOut': new FormControl('OFF'),
      'wedIn': new FormControl('OFF'),
      'wedOut': new FormControl('OFF'),
      'thuIn': new FormControl('OFF'),
      'thuOut': new FormControl('OFF'),
      'friIn': new FormControl('OFF'),
      'friOut': new FormControl('OFF'),
      'satIn': new FormControl('OFF'),
      'satOut': new FormControl('OFF'),
    });
    this.messageForm = new FormGroup({
      'message': new FormControl(null, {validators: [Validators.required]})
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
    this.userService.setUserSchedule(
      this.scheduleForm.value.employee,
      this.scheduleForm.value.weekOf,
      this.scheduleForm.value.sunIn,
      this.scheduleForm.value.sunOut,
      this.scheduleForm.value.monIn,
      this.scheduleForm.value.monOut,
      this.scheduleForm.value.tueIn,
      this.scheduleForm.value.tueOut,
      this.scheduleForm.value.wedIn,
      this.scheduleForm.value.wedOut,
      this.scheduleForm.value.thuIn,
      this.scheduleForm.value.thuOut,
      this.scheduleForm.value.friIn,
      this.scheduleForm.value.friOut,
      this.scheduleForm.value.satIn,
      this.scheduleForm.value.satOut,
    );
    this.scheduleForm.reset();
  }

  onPostMessage() {
    if (this.messageForm.invalid) {
      return;
    }
    this.messageService.postMessage(this.messageForm.value.message);
    this.messageForm.reset();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.tabIndex = tabChangeEvent.index;
  }
}
