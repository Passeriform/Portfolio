import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CageGridComponent } from "./cage-grid/cage-grid.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { ScrollableComponent } from "./scrollable/scrollable.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { TooltipDirective } from "./tooltip/tooltip.directive";
import { TooltipService } from "./tooltip/tooltip.service";
import { CageGridDirective } from "./cage-grid/cage-grid.directive";
import { NavigatorComponent } from "./navigator/navigator.component";
import { IconUriPipe } from "./pipes/icon-uri.pipe";
import { RetainPipe } from "./pipes/retain.pipe";
import { EnvironmentPipe } from "./pipes/environment.pipe";
import { WikiPipe } from "./pipes/wiki.pipe";
import { SocialGlyphsComponent } from "./social-glyphs/social-glyphs.component";
// import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

// import { ShowAuthedDirective } from "./show-authed.directive";

@NgModule({
	declarations: [
		// BreadcrumbComponent,
		CageGridComponent,
		CageGridDirective,
		EnvironmentPipe,
		IconUriPipe,
		NavigatorComponent,
		OverlayComponent,
		RetainPipe,
		ScrollableComponent,
		SocialGlyphsComponent,
		TooltipComponent,
		TooltipDirective,
		WikiPipe,
	],
	exports: [
		// BreadcrumbComponent,
		CageGridComponent,
		CageGridDirective,
		CommonModule,
		EnvironmentPipe,
		FormsModule,
		IconUriPipe,
		NavigatorComponent,
		OverlayComponent,
		RetainPipe,
		ScrollableComponent,
		SocialGlyphsComponent,
		TooltipComponent,
		TooltipDirective,
		WikiPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	providers: [
		TooltipService,
	]
})
export class SharedModule { }
