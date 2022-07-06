import { NgModule } from "@angular/core";

import { CanvasService } from "./services/canvas.service";
import { PageEndRevealService } from "./services/page-end-reveal.service";
import { SplashStateService } from "./services/splash-state.service";
import { WikiService } from "./services/wiki.service";

@NgModule({
	providers: [
		CanvasService,
		PageEndRevealService,
		SplashStateService,
		WikiService,
	],
})
export class CoreModule { }
