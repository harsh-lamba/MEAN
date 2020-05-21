import { Observable, Observer } from 'rxjs';
import { AbstractControl } from '@angular/forms';

export const MiMeTypeValidator = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader =  new FileReader();
  let loadEndCallBack;

  const frOb = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    loadEndCallBack = () =>{
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
      unsubscriber();
    }
    fileReader.addEventListener('loadend', loadEndCallBack)
    fileReader.readAsArrayBuffer(file);
  })

  const unsubscriber = () => {
    fileReader.removeEventListener('loadend', loadEndCallBack)
  }

  return frOb;
};


