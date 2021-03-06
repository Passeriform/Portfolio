import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CageGridComponent } from './cage-grid/cage-grid.component';
import { CageGridDirective } from './cage-grid/cage-grid.directive';
import { LoaderComponent } from './loader/loader.component';
import { HarmonicLoaderComponent } from './loader/harmonic-loader/harmonic-loader.component';
import { OverlayComponent } from './overlay/overlay.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { IconUriPipe } from './icon-uri.pipe';
import { RetainPipe } from './retain.pipe';
import { EnvPipe } from './env.pipe';

// import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	declarations: [
		CageGridComponent,
		CageGridDirective,
		LoaderComponent,
		HarmonicLoaderComponent,
		OverlayComponent,
		ScrollableComponent,
		TooltipComponent,
		TooltipDirective,
		IconUriPipe,
		RetainPipe,
		EnvPipe,
	],
	exports: [
		CageGridComponent,
		CageGridDirective,
		LoaderComponent,
		HarmonicLoaderComponent,
		OverlayComponent,
		ScrollableComponent,
		TooltipComponent,
		TooltipDirective,

		IconUriPipe,
		RetainPipe,
		EnvPipe,

		CommonModule,
		FormsModule,
	],
})
export class SharedModule { }
