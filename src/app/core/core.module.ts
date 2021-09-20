import { NgModule } from "@angular/core";

import { CanvasService } from "./services/canvas.service";
import { SplashStateService } from "./services/splash-state.service";

@NgModule({
	providers: [
		CanvasService,
		SplashStateService,
	],
})
export class CoreModule { }
