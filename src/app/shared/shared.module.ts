import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CageGridComponent } from "./cage-grid/cage-grid.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { ScrollableComponent } from "./scrollable/scrollable.component";
import { PageNavComponent } from "./scrollable/page-nav/page-nav.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { TooltipDirective } from "./tooltip/tooltip.directive";
import { CageGridDirective } from "./cage-grid/cage-grid.directive";
import { NavigatorComponent } from "./navigator/navigator.component";
import { IconUriPipe } from "./pipes/icon-uri.pipe";
import { RetainPipe } from "./pipes/retain.pipe";
import { SplitByPipe } from "./pipes/split-by.pipe";
import { UnionArrayPipe } from "./pipes/union-array.pipe";
import { BoldSpanPipe } from "./pipes/bold-span.pipe";
import { EnvironmentPipe } from "./pipes/environment.pipe";
import { WikiPipe } from "./pipes/wiki.pipe";
import { SocialGlyphsComponent } from "./social-glyphs/social-glyphs.component";
// import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

// import { ShowAuthedDirective } from "./show-authed.directive";

@NgModule({
	declarations: [
		// BreadcrumbComponent,
		BoldSpanPipe,
		CageGridComponent,
		CageGridDirective,
		EnvironmentPipe,
		IconUriPipe,
		NavigatorComponent,
		OverlayComponent,
		PageNavComponent,
		RetainPipe,
		ScrollableComponent,
		SocialGlyphsComponent,
		SplitByPipe,
		TooltipComponent,
		TooltipDirective,
		UnionArrayPipe,
		WikiPipe,
	],
	exports: [
		// BreadcrumbComponent,
		BoldSpanPipe,
		CageGridComponent,
		CageGridDirective,
		CommonModule,
		EnvironmentPipe,
		FormsModule,
		IconUriPipe,
		NavigatorComponent,
		OverlayComponent,
		PageNavComponent,
		RetainPipe,
		ScrollableComponent,
		SocialGlyphsComponent,
		SplitByPipe,
		TooltipComponent,
		TooltipDirective,
		UnionArrayPipe,
		WikiPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
})
export class SharedModule { }
