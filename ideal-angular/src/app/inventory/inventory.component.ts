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
  isFirstOpen = true;
  showFiller = false;

  vehicles: Vehicle[] = [];
  totalVehicles = 0;
  private vehiclesSub: Subscription;

  parts: Part[] = [];
  totalParts = 0;
  private partsSub: Subscription;

  isLoading = false;
  checked = false;
  form: FormGroup;

  constructor(
    private router: Router,
    private titleService: Title,
    private vehicleService: VehicleService,
    private partService: PartService
  ) {}

onRadioChange(event: MatRadioChange) {
  this.isLoading = event.value;
}
  ngOnInit() {
    if (this.isLoading) {
      this.isLoading = true;
      this.titleService.setTitle('Part Inventory | iDealCars');
    this.form = new FormGroup({
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
        this.isLoading = true;
        this.parts = partData.parts;
      });
  }
    this.isLoading = false;
    this.titleService.setTitle('Vehicle Inventory | iDealCars');
    this.form = new FormGroup({
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
        this.isLoading = false;
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
    if (this.form.invalid) {
      return;
    }
    this.isLoading = false;
    this.vehicleService.addVehicle(
      this.form.value.vinId,
      this.form.value.price,
      this.form.value.year,
      this.form.value.make,
      this.form.value.vehicleModel,
      this.form.value.carColor,
      this.form.value.optionsDescription
    );
    this.isLoading = false;
    this.form.reset();
  }
  savePart() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.partService.addPart(
      this.form.value.partId,
      this.form.value.name,
      this.form.value.description,
      this.form.value.price
    );
    this.isLoading = true;
    this.form.reset();
  }

}
