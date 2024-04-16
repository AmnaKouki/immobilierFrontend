import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // get current route
  isLoginPage = false;
  ngOnInit() {
    if (window.location.pathname === '/login') {
      this.isLoginPage = true;
    } else {
      this.isLoginPage = false;
    }
  }
}
