import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public onActivate($event) {
    console.log(`Activated Component`, $event);
  }

  public onDeactivate($event) {
    console.log(`Deactivated Component`, $event);
  }
}
