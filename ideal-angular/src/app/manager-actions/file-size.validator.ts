import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const fileSizeValidator = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const sizeLimit = 1024 * 1024 * 3;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener('loadend', () => {
      if (file.size < sizeLimit) {
        observer.next(null);
      } else {
        observer.next({invalidFileSize: true});
        alert('File size must be less than 3MB.');
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
