import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CageGridComponent } from './cage-grid/cage-grid.component';
import { CageGridDirective } from './cage-grid/cage-grid.directive';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { HarmonicLoaderComponent } from './loader/harmonic-loader/harmonic-loader.component';
import { NavtabComponent } from './navtab/navtab.component';
import { NavtabDirective } from './navtab/navtab.directive';
import { OverlayComponent } from './overlay/overlay.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { IconUriPipe } from './icon-uri.pipe';
import { RetainPipe } from './retain.pipe';
import { EnvPipe } from './env.pipe';

// Import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	declarations: [
		CageGridComponent,
		CageGridDirective,
		HeaderComponent,
		LoaderComponent,
		HarmonicLoaderComponent,
		NavtabComponent,
		NavtabDirective,
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
		HeaderComponent,
		LoaderComponent,
		HarmonicLoaderComponent,
		NavtabComponent,
		NavtabDirective,
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
