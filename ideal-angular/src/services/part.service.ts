import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Part } from '../models/part.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { puts } from 'util';

const BACKEND_URL = environment.apiUrl + '/parts';

@Injectable({providedIn: 'root'})
export class PartService {
  private parts: Part[] = [];
  private partsUpdated = new Subject<{parts: Part[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getParts() {
    this.http
      .get<{message: string, parts: any}>(
        BACKEND_URL
      )
      .pipe(map((partData) => {
        return {
          parts: partData.parts.map(part => {
            return {
              // id: part._id,
              partID: part._partID,
              partName: part.partName,
              partPrice: part.partPrice,
              partQuantity: part.partQuantity,
              partCompatibility: part.partCompatibility,
              partDescription: part.partDescription,
              partImage: part.partImage
            };
          })
        };
      }))
      .subscribe((transformedPartData) => {
        this.parts = transformedPartData.parts;
        this.partsUpdated.next({parts: [...this.parts]});
      });
  }

  getPartUpdateListener() {
    return this.partsUpdated.asObservable();
  }
  // SAVE functions for dialog-add-part
  addPart(
    partID: string,
    partName: string,
    partPrice: string,
    partQuantity: string,
    partCompatibility: string,
    partDescription: string,
    partImage: File
  ) {
    const partData  = new FormData();
    partData.append('partID', partID);
    partData.append('partName', partName);
    partData.append('partPrice', partPrice);
    partData.append('partQuantity', partQuantity);
    partData.append('partCompatibility', partCompatibility);
    partData.append('partDescription', partDescription);
    partData.append('partImage', partImage, partName);
    return this.http
      .post<{message: string, part: Part }>(BACKEND_URL, partData)
      .subscribe((resData) => {
        const part: Part = {
          partID: resData.part.partID,
          partName: partName,
          partPrice: partPrice,
          partQuantity: partQuantity,
          partCompatibility: partCompatibility,
          partDescription: partDescription,
          partImage: resData.part.partImage
        };
        this.parts.push(part);
        this.partsUpdated.next({parts: [...this.parts]});
        console.log(resData);
        window.location.reload();
      });
  }
  // helper method (not used) for edit part
  getPartByID(partID: string) {
    return this.http.get<{
      _partID: string,
      partName: string,
      partPrice: string,
      partQuantity: string,
      partCompatibility: string,
      partDescription: string,
      partImage: string; }>( BACKEND_URL + '/' + partID);
  }

  // EDIT functions for parts dialog-edit-part
  updatePart(
    partID: string,
    partName: string,
    partPrice: string,
    partQuantity: string,
    partCompatibility: string,
    partDescription: string,
    partImage: File | string
    ) {
    let partData: Part | FormData;
    if (typeof(partImage) === 'object') {
      partData = new FormData();
      partData.append('partID', partID);
      partData.append('partName', partName);
      partData.append('partPrice', partPrice);
      partData.append('partQuantity', partQuantity);
      partData.append('partCompatibility', partCompatibility);
      partData.append('partDescription', partDescription);
      partData.append('partImage', partImage, partName);
    } else {
        partData = {
          partID: partID,
          partName: partName,
          partPrice: partPrice,
          partQuantity: partQuantity,
          partCompatibility: partCompatibility,
          partDescription: partDescription,
          partImage: partImage
    };
  }
    return this.http.put(BACKEND_URL + '/' + partID, partData)
    .subscribe(response => {
      const updatedParts = [...this.parts];
      const oldPartIndex = updatedParts.findIndex(p => p.partID === partID);
      const part: Part = {
        partID: partID,
        partName: partName,
        partPrice: partPrice,
        partQuantity: partQuantity,
        partCompatibility: partCompatibility,
        partDescription: partDescription,
        partImage: ''
      };
      updatedParts[oldPartIndex] = part;
      this.parts = updatedParts;
      this.partsUpdated.next({parts: [...this.parts ]});
      this.router.navigate(['/inventory']);
      window.location.reload();
    });
  }

  // DELETE method for parts; used in dialog-edit-part
  deletePart(partID: string) {
    console.log('Deleted! ' + partID);
    return this.http.delete(BACKEND_URL + '/' + partID)
     .subscribe(() => {
      const updatedParts = this.parts.filter(part => part.partID !== partID);
      this.parts = updatedParts;
      this.partsUpdated.next({parts: [...this.parts]});

    });
  }
}
