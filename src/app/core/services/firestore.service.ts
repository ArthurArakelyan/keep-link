import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  query,
  getDocs,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(
    private firestore: Firestore,
  ) {}

  get<T extends { id: string }>(path: string, ...getQuery: QueryConstraint[]): Observable<T[]> {
    return from(new Promise<T[]>(async (resolve, reject) => {
      try {
        const dbCollection = collection(this.firestore, path);

        const pathWithQuery = getQuery.length
          ? query(dbCollection, ...getQuery)
          : dbCollection;

        const response = await getDocs(pathWithQuery);

        const docs = response.docs;

        if (!docs.length) {
          resolve([]);
        }

        resolve(docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as T[]);
      } catch (e) {
        reject(e);
      }
    }));
  }

  getDoc<T extends { id: string }>(path: string, id: string): Observable<T> {
    return from(new Promise<T>(async (resolve, reject) => {
      try {
        const newDoc = doc(this.firestore, path, id);

        const response = await getDoc(newDoc);

        if (!response.exists()) {
          throw new Error(`Item doesn't exist.`);
        }

        resolve({ id: response.id, ...response.data() } as T);
      } catch (e) {
        reject(e);
      }
    }));
  }

  add<T = any>(path: string, data: T, id?: string): Observable<void> {
    return from(new Promise<void>(async (resolve, reject) => {
      try {
        const newDoc: any = id ? doc(this.firestore, path, id) : collection(this.firestore, path);

        if (id) {
          resolve(setDoc(newDoc, data));
        }

        resolve(addDoc(newDoc, data).then(() => undefined));
      } catch (e) {
        reject(e);
      }
    }));
  }

  edit<T = any>(path: string, data: T, id: string): Observable<void> {
    return from(new Promise<void>(async (resolve, reject) => {
      try {
        const newDoc = doc(this.firestore, path, id);

        resolve(updateDoc(newDoc, data as any));
      } catch (e) {
        reject(e);
      }
    }));
  }

  delete(path: string, id: string): Observable<void> {
    return from(new Promise<void>(async (resolve, reject) => {
      try {
        const newDoc = doc(this.firestore, path, id);

        resolve(deleteDoc(newDoc));
      } catch (e) {
        reject(e);
      }
    }));
  }
}
