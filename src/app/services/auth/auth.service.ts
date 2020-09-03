import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: any

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject<string>("");

  constructor(private router: Router) {
  }

  async checkAuthenticated() {

    let user = localStorage.getItem("user");
    let authenticated = false;

    if (user) {
      authenticated = true;
    }

    this.isAuthenticated.next(authenticated);
    this.user.next(await this.getUser());

    return authenticated;
  }

  async getUser() {

    let user = localStorage.getItem("user");

    if (user) {

      return JSON.parse(user).name
    }
    return null;
  }

  async login(username: string, password: string) {

    if (username === 'test@gmail.com' && password === 'test') {
      let user = { token: "token", name: "John" };
      localStorage.setItem('user', JSON.stringify(user));
      this.user.next(user.name);

      this.isAuthenticated.next(true);

    } else {

      throw Error('Invalid credential');

    }

  }

  async logout(redirect: string) {
    try {
      localStorage.clear();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}