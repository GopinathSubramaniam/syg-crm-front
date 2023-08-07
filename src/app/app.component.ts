import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sygcrm-front';

  static spinner = false;

  get showSpinner() {
    return AppComponent.spinner;
  }
}
