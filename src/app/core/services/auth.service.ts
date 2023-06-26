import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private auth: Auth,
  ) {}

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  onAuthChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }

  sendForgotPasswordEmail(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  logout() {
    return from(signOut(this.auth));
  }

  sendEmailVerification(user: User) {
    return from(sendEmailVerification(user));
  }

  get user() {
    return this.auth.currentUser;
  }
}
