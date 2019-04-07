import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Part } from '../../models/part.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../manager-actions/mime-type.validator';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  parts: Part[] = [];
  private partsSub: Subscription;

  isLoading = false;
  checked = false;
  partform: FormGroup;
  imagePreview: string;

  constructor(
    public dialog: MatDialog,
    private partService: PartService,
    private addPartRef: MatDialogRef<AddPartComponent>,
    private formBuild: FormBuilder
  ) { }

  ngOnInit() {

    this.partform = new FormGroup({
      'partID': new FormControl(null, {
        validators: [Validators.required]
      }),
      'partName': new FormControl(null, {
        validators: [Validators.required]
      }),
      'partPrice': new FormControl(null, {
        validators: [Validators.required]
      }),
      'partQuantity': new FormControl(null, {
        validators: [Validators.required]
      }),
      'partCompatibility': new FormControl(null, {
        validators: [Validators.required]
      }),
      'partDescription': new FormControl(null, {
        validators: [Validators.required]
      }),
      'partImage': new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      })

    });
    this.partService.getParts();
    this.partsSub = this.partService.getPartUpdateListener()
      .subscribe((partData: { parts: Part[] }) => {
        this.parts = partData.parts;
      });
  }

  savePart() {
    if (this.partform.invalid) {
      return;
    }
    this.partService.addPart(
      this.partform.get('partID').value,
      this.partform.get('partName').value,
      this.partform.get('partPrice').value,
      this.partform.get('partQuantity').value,
      this.partform.get('partCompatibility').value,
      this.partform.get('partDescription').value,
      this.partform.get('partImage').value

    );
    console.log(this.partform.value);
    this.partform.reset();

  }
  /* closes 'Add Part Inventory' form */
  close() {
    this.addPartRef.close();

  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.partform.patchValue({ partImage: file });
    this.partform.get('partImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

