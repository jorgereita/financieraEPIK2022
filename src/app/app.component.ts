import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'epik-core-pwa';

  constructor(
    public updates: SwUpdate,
  ) {
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => this.updateApp());
    });
  }

  updateApp(): void {
    document.location.reload();
    console.log('La aplicación se está actualizando');
  }
}
