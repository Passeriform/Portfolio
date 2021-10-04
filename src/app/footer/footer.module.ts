import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "@shared/shared.module";
import { ChirpyComponent } from "./chirpy/chirpy.component";
import { FooterComponent } from "./footer.component";
import { FooterService } from "./footer.service";

@NgModule({
	declarations: [
		ChirpyComponent,
		FooterComponent,
	],
	exports: [ FooterComponent ],
	imports: [
		RouterModule,
		SharedModule,
	],
	providers: [ FooterService ],
})
export class FooterModule { }
