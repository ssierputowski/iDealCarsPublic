import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Part } from '../../models/part.model';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../manager-actions/mime-type.validator';
import { fileSizeValidator } from '../manager-actions/file-size.validator';


@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  parts: Part[] = [];
  private partsSub: Subscription;

  partform: FormGroup;
  imagePreview: string;

  constructor(
    public dialog: MatDialog,
    private partService: PartService,
    private addPartRef: MatDialogRef<AddPartComponent>,
    private formBuild: FormBuilder
  ) { }

  ngOnInit() {
    // forms for displaying part data for part entry
    this.partform = new FormGroup({
      'partID': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      'partName': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(25)]
      }),
      'partPrice': new FormControl(null, {
        validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)]
      }),
      'partQuantity': new FormControl(null, {
        validators: [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern('[0-9]*')]
      }),
      'partCompatibility': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(25)]
      }),
      'partDescription': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      'partImage': new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType, fileSizeValidator]
      })

    });
    this.partService.getParts();
    this.partsSub = this.partService.getPartUpdateListener()
      .subscribe((partData: { parts: Part[] }) => {
        this.parts = partData.parts;
      });
  }
  // save method-saves values currently entered in the partform
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
    this.addPartRef.close();

  }
  /* closes 'Add Part Inventory' form */
  close() {
    this.addPartRef.close();

  }
  // Image selection function-listens for event sets preview when image file selected
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
  // ERROR Messaging- displays error message if validators violated=======================================
  getPRICEErrorMessage() {
    return  'PRICE must be a number of format 0.00 less than 20,000,000.00!';
  }
  getQUANTITYErrorMessage() {
    return  'QUANTITY must be a number between 0 and 1,000!';
  }
  getGENErrorMessage() {
    return  'FIELD REQUIRED!';
  }
}

