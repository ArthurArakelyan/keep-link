import { Injectable } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';

// Services
import { FirestoreService } from './firestore.service';

// Models
import { IFolder, IFolderWithoutId } from '../models/folder.model';

@Injectable({ providedIn: 'root' })
export class FolderService {
  private readonly path = 'folders';

  constructor(
    private firestoreService: FirestoreService,
  ) {}

  getFolders(userId: string) {
    return this.firestoreService.get<IFolder>(
      this.path,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    );
  }

  getFolder(id: string) {
    return this.firestoreService.getDoc<IFolder>(this.path, id);
  }

  addFolder(link: IFolderWithoutId, id?: string) {
    return this.firestoreService.add(this.path, link, id);
  }

  editFolder(id: string, link: IFolderWithoutId) {
    return this.firestoreService.edit(this.path, link, id);
  }

  deleteFolder(id: string) {
    return this.firestoreService.delete(this.path, id);
  }
}
