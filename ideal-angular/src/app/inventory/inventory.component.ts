import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatRadioModule} from '@angular/material';
import { VehicleService } from 'src/services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { PartService } from 'src/services/part.service';
import { Part } from '../../models/part.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

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
  }

}
