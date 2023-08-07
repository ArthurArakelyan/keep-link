import { Injectable } from '@angular/core';
import { where, orderBy } from '@angular/fire/firestore';

// Services
import { FirestoreService } from './firestore.service';

// Models
import { ILink, ILinkWithoutId } from '../models/link.model';

@Injectable({ providedIn: 'root' })
export class LinkService {
  private readonly path = 'links';

  constructor(
    private firestoreService: FirestoreService,
  ) {}

  getLinks(userId: string) {
    return this.firestoreService.get<ILink>(
      this.path,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    );
  }

  getLink(id: string) {
    return this.firestoreService.getDoc<ILink>(this.path, id);
  }

  addLink(link: ILinkWithoutId, id?: string) {
    return this.firestoreService.add(this.path, link, id);
  }

  editLink(id: string, link: ILinkWithoutId) {
    return this.firestoreService.edit(this.path, link, id);
  }

  deleteLink(id: string) {
    return this.firestoreService.delete(this.path, id);
  }
}
