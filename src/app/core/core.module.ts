import { NgModule } from "@angular/core";

import { CanvasService } from "./services/canvas.service";
import { PageRevealService } from "./services/page-reveal.service";
import { SplashStateService } from "./services/splash-state.service";
import { WikiService } from "./services/wiki.service";

@NgModule({
	providers: [
		CanvasService,
		PageRevealService,
		SplashStateService,
		WikiService,
	],
})
export class CoreModule { }
