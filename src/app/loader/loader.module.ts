import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { HarmonicLoaderComponent } from "./harmonic-loader/harmonic-loader.component";
import { LoaderComponent } from "./loader.component";
import { LoaderService } from "./loader.service";

@NgModule({
	declarations: [
		HarmonicLoaderComponent,
		LoaderComponent,
	],
	exports: [
		HarmonicLoaderComponent,
		LoaderComponent,
	],
	imports: [ SharedModule ],
	providers: [ LoaderService ],
})
export class LoaderModule { }
