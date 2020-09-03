import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../app/services/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Next Gen Banking';
  isAuthenticated: boolean;
  user: string;

  constructor(public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );

    this.authService.user.subscribe(
      (user: string) => {
        this.user = user;
      }
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
    this.user = await this.authService.getUser();

  }

  logout() {
    this.authService.logout('/');
  }
}


