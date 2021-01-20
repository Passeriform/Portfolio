import { Component } from '@angular/core';

import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'Passeriform';

  constructor(private loaderService: LoaderService) { }

  onRouteChange = () => {
    // this.loaderService.flushJobs();
  }
}
