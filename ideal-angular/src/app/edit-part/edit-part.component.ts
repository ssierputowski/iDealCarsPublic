import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Part } from '../../models/part.model';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder, FormGroupDirective } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { mimeType } from '../manager-actions/mime-type.validator';
import { fileSizeValidator } from '../manager-actions/file-size.validator';


@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.css']
})
export class EditPartComponent implements OnInit {

  imagePreview: string;
  current_info: any;
  edit_part: FormGroup;
  dataSourceParts: MatTableDataSource<Part>;

  public edit = false;
  public imgClicked = false;
  part: Part;
  partID: string;


  constructor(
    public dialog: MatDialog,
    public editPartRef: MatDialogRef<EditPartComponent>,
    private partService: PartService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuild: FormBuilder,
    private route: ActivatedRoute) {// this passes the data from the inventory component to this dialog
      // forms for displaying part data to edit
      this.edit_part = this.formBuild.group({
        'partID': new FormControl(null, { validators: [Validators.required, Validators.maxLength(30)] }),
        'partName': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
        // tslint:disable-next-line:max-line-length
        'partPrice': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
        // tslint:disable-next-line:max-line-length
        'partQuantity': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern('[0-9]*')] }),
        'partCompatibility': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
        'partDescription': new FormControl(null, { validators: [Validators.required, Validators.maxLength(50)] }),
        'partImage': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType, fileSizeValidator] }),
      });
     }


  ngOnInit() {

    // Populates form with part data for EDIT
    this.route.params.subscribe(
      param => {

        this.edit_part.patchValue({partID: this.data.partID});
        this.edit_part.patchValue({partName: this.data.partName});
        this.edit_part.patchValue({partPrice: this.data.partPrice});
        this.edit_part.patchValue({partQuantity: this.data.partQuantity});
        this.edit_part.patchValue({partCompatibility: this.data.partCompatibility});
        this.edit_part.patchValue({partDescription: this.data.partDescription});
        this.edit_part.patchValue({partImage: this.data.partImage});

      }
    );
  }
  // Image selection function-listens for event sets preview when image file selected
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.edit_part.patchValue({partImage: file});
    this.edit_part.get('partImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  // save method-saves values currently entered in the form for EDIT function
  saveEditedPart() {
    if (this.edit_part.invalid) {
      return;
    }
    this.partService.updatePart(
      this.data.id,
      this.edit_part.get('partID').value,
      this.edit_part.get('partName').value,
      this.edit_part.get('partPrice').value,
      this.edit_part.get('partQuantity').value,
      this.edit_part.get('partCompatibility').value,
      this.edit_part.get('partDescription').value,
      this.edit_part.get('partImage').value

    );
    this.editPartRef.close();
  }

  close() {
    this.editPartRef.close();
  }
  // this for delete vehicle by part number, partID
  onDelete(partID: string) {
    this.partService.deletePart(partID);
    this.editPartRef.close();
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
  // boolean setters for *ngIf bindings
  setEdit() {
    this.edit = true;
  }
  unSetEdit() {
    this.edit = false;
  }
  imgClick() {
    this.imgClicked = true;
  }
}
