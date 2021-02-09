import { NgModule } from '@angular/core';

import { SplashStateService } from './services/splash-state.service';
import { LoaderService } from './services/loader.service';
import { CanvasService } from './services/canvas.service';

@NgModule({
	imports: [],
	declarations: [],
	providers: [
		SplashStateService,
		LoaderService,
		CanvasService,
	],
	bootstrap: [],
})
export class CoreModule { }
