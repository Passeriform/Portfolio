import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { HarmonicLoaderComponent } from "./harmonic-loader/harmonic-loader.component";
import { LoaderService } from "./services/loader.service";
import { LoaderComponent } from "./loader.component";

@NgModule({
	exports: [
		HarmonicLoaderComponent,
		LoaderComponent,
	],
	imports: [
		HarmonicLoaderComponent,
		LoaderComponent,
		SharedModule,
	],
	providers: [ LoaderService ],
})
export class LoaderModule { }
