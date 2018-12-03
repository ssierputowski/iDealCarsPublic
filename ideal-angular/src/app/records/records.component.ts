import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  isFirstOpen = true;
  showFiller = false;

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Client Records | iDealCars');
  }
  function ($scope) {
    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
    $scope.newContacts = {};
    $scope.saved = localStorage.getItem('contacts');
    $scope.contacts = (localStorage.getItem('contacts') !== null) ? JSON.parse($scope.saved) : [
    {fname: 'Sagar', lname: 'Patadia', carYear: '2019', carMake: 'Mercedes',
    carModel: 'C300 4Matic', telephone: '0123456789', email: 'sagar@idealcars.com'}
    ];

    localStorage.setItem('contacts', JSON.stringify($scope.contacts));

    $scope.saveContact = function() {

      $scope.contacts.push($scope.newContacts);
      localStorage.setItem('contacts', JSON.stringify($scope.contacts));
      $scope.newContacts = {};

    };

  }

}
/**
import {Component} from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

/**
 * @title List with sections
@Component({
  selector: 'list-sections-example',
  styleUrls: ['list-sections-example.css'],
  templateUrl: 'list-sections-example.html',
})
export class ListSectionsExample {
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
}
 */
