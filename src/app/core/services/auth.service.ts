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
  updateEmail,
  updatePassword,
  deleteUser,
} from '@angular/fire/auth';
import { from } from 'rxjs';

// Constants
import { authErrorMessage } from '../constants/error-messages';

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

  changePassword(password: string) {
    if (!this.user) {
      return from(new Promise((reject) => {
        reject(authErrorMessage);
      }));
    }

    return from(updatePassword(this.user, password));
  }

  changeEmail(email: string) {
    if (!this.user) {
      return from(new Promise((reject) => {
        reject(authErrorMessage);
      }));
    }

    return from(updateEmail(this.user, email));
  }

  deleteUser() {
    if (!this.user) {
      return from(new Promise((reject) => {
        reject(authErrorMessage);
      }));
    }

    return from(deleteUser(this.user));
  }

  get user() {
    return this.auth.currentUser;
  }
}
