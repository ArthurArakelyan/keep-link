import { Injectable } from '@angular/core';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
  Storage,
  UploadResult,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

// Models
import { FileType } from '../models/file.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(
    private storage: Storage,
  ) {}

  get(path: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, path)));
  }

  add(path: string, file: FileType, userId: string): Observable<UploadResult> {
    const storageRef = ref(this.storage, path);

    return from(uploadBytes(storageRef, file, {
      customMetadata: {
        userId,
      },
    }));
  }

  delete(path: string): Observable<void> {
    return from(deleteObject(ref(this.storage, path)));
  }
}
