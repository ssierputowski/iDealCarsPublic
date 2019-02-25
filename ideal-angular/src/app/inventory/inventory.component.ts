import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { MatTableDataSource } from '@angular/material';

=======
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatRadioModule} from '@angular/material';
import { VehicleService } from 'src/services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { PartService } from 'src/services/part.service';
import { Part } from '../../models/part.model';
import { Subscription } from 'rxjs';
>>>>>>> 254234dc2bfd279d77a67ba20829a0014f0c9484
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
<<<<<<< HEAD

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
=======

  vehicles: Vehicle[] = [];
  totalVehicles = 0;
  private vehiclesSub: Subscription;

  parts: Part[] = [];
  totalParts = 0;
  private partsSub: Subscription;

  isLoading = false;
  checked = false;
  vehicleform: FormGroup;
  partform: FormGroup;


  constructor(
    private router: Router,
    private titleService: Title,
    private vehicleService: VehicleService,
    private partService: PartService
  ) {}

onRadioChange(event: MatRadioChange) {
  this.isLoading = event.value;
  this.checked = event.value;
}
  ngOnInit() {
      if (this.checked) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
      this.titleService.setTitle('Inventory | iDealCars');
    this.partform = new FormGroup({
      'partId': new FormControl(null, {
        validators: [Validators.required]
      }),
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'description': new FormControl(null, {
        validators: [Validators.required]
      }),
      'price': new FormControl(null, {
        validators: [Validators.required]
      })
    });
      this.partService.getParts();
      this.partsSub = this.partService.getPartUpdateListener()
      .subscribe((partData: { parts: Part[] }) => {
        this.parts = partData.parts;
      });

    /**this.titleService.setTitle('Vehicle Inventory | iDealCars'); */
    this.vehicleform = new FormGroup({
      'vinId': new FormControl(null, {
        validators: [Validators.required]
      }),
      'price': new FormControl(null, {
        validators: [Validators.required]
      }),
      'year': new FormControl(null, {
        validators: [Validators.required]
      }),
      'make': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehicleModel': new FormControl(null, {
        validators: [Validators.required]
      }),
      'carColor': new FormControl(null, {
        validators: [Validators.required]
      }),
      'optionsDescription': new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.vehicleService.getVehicles();
    this.vehiclesSub = this.vehicleService.getVehicleUpdateListener()
      .subscribe((vehicleData: { vehicles: Vehicle[] }) => {
        this.vehicles = vehicleData.vehicles;
      });
  }

  /**open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modalTitle', backdrop: 'static'})
      .result.then((res) => {
        this.saveVehicle();
      });
  }*/

  saveVehicle() {
    if (this.vehicleform.invalid) {
      return;
    }
    this.vehicleService.addVehicle(
      this.vehicleform.value.vinId,
      this.vehicleform.value.price,
      this.vehicleform.value.year,
      this.vehicleform.value.make,
      this.vehicleform.value.vehicleModel,
      this.vehicleform.value.carColor,
      this.vehicleform.value.optionsDescription
    );

    this.vehicleform.reset();
  }
  savePart() {
    if (this.partform.invalid) {
      return;
    }
    this.partService.addPart(
      this.partform.value.partId,
      this.partform.value.name,
      this.partform.value.description,
      this.partform.value.price
    );
    this.partform.reset();
>>>>>>> 254234dc2bfd279d77a67ba20829a0014f0c9484
  }

}
