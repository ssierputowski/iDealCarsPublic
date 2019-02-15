import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) {}

  displayedColumns = [
    'vehicleId',
    'vehicleYear',
    'vehicleMake',
    'vehicleModel',
    'vehicleCondition',
    'vehicleColor',
    'vehicleDetails'
  ];

  inventory = [
    { vehicleId: 'TBHF2000201', vehicleYear: 2001, vehicleMake: 'Honda', vehicleModel: 'S2000', newOrUsed: 'Used', vehicleColor: 'Silver', vehicleDetails: 'Convertible, A/C, here are some more details just to see how it handles extra data space' },
    { vehicleId: 'TBHF2000202', vehicleYear: 2019, vehicleMake: 'subaru', vehicleModel: 'WRX', newOrUsed: 'New', vehicleColor: 'Rally Blue', vehicleDetails: '' },
    { vehicleId: 'TBHF2000203', vehicleYear: 2003, vehicleMake: 'Acura', vehicleModel: 'RSX-S', newOrUsed: 'Used', vehicleColor: 'Black', vehicleDetails: 'Sunroof, 5-Speed' },
    { vehicleId: 'TBHF2000204', vehicleYear: 1999, vehicleMake: 'Toyota', vehicleModel: '4Runner', newOrUsed: 'Used', vehicleColor: 'White', vehicleDetails: '' },
    { vehicleId: 'TBHF2000205', vehicleYear: 2015, vehicleMake: 'Kia', vehicleModel: 'Optima', newOrUsed: 'Used', vehicleColor: 'Grey', vehicleDetails: 'Sunroof, A/C' },
    { vehicleId: 'TBHF2000206', vehicleYear: 2005, vehicleMake: 'Honda', vehicleModel: 'Accord EX', newOrUsed: 'Used', vehicleColor: 'Black', vehicleDetails: '5-Speed' },
    { vehicleId: 'TBHF2000207', vehicleYear: 2006, vehicleMake: 'Honda', vehicleModel: 'Accord EX', newOrUsed: 'Used', vehicleColor: 'Black', vehicleDetails: '' },
    { vehicleId: 'TBHF2000208', vehicleYear: 2002, vehicleMake: 'Nissan', vehicleModel: 'Skyline R34-GTR', newOrUsed: 'Used', vehicleColor: 'Silver', vehicleDetails: '6-Speed' },
    { vehicleId: 'TBHF2000209', vehicleYear: 1970, vehicleMake: 'Dodge', vehicleModel: 'Charger', newOrUsed: 'Used', vehicleColor: 'Black', vehicleDetails: '4-Speed' }
  ];

  dataSource = new MatTableDataSource(this.inventory);

  ngOnInit() {
    this.titleService.setTitle('Vehicle Inventory | iDealCars');
  }

  print(id: any) {
    alert(id);
  }

}
