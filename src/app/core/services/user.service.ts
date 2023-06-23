import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Services
import { FirestoreService } from './firestore.service';
import { StorageService } from './storage.service';

// Models
import { IUser } from '../models/user.model';
import { FileType } from '../models/file.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly path = 'users';

  addedUser$: Subject<boolean> = new Subject();

  constructor(
    private firestoreService: FirestoreService,
    private storageService: StorageService,
  ) {}

  getUsers() {
    return this.firestoreService.get<IUser>(this.path);
  }

  getUser(id: string) {
    return this.firestoreService.getDoc<IUser>(this.path, id);
  }

  addUser(user: IUser, id?: string) {
    return this.firestoreService.add(this.path, user, id);
  }

  editUser(id: string, user: IUser) {
    return this.firestoreService.edit(this.path, user, id);
  }

  deleteUser(id: string) {
    return this.firestoreService.delete(this.path, id);
  }

  getAvatar(id: string) {
    return this.storageService.get(`${this.path}/${id}`);
  }

  addAvatar(image: FileType, id: string) {
    return this.storageService.add(`${this.path}/${id}`, image, id);
  }

  deleteAvatar(id: string) {
    return this.storageService.delete(`${this.path}/${id}`);
  }
}
