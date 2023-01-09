import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "@shared/shared.module";

import { ChirpyComponent } from "./chirpy/chirpy.component";
import { FooterService } from "./services/footer.service";
import { FooterComponent } from "./footer.component";

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
