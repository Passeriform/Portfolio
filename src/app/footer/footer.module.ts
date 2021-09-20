import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "@shared/shared.module";
import { AboutModule } from "@app/about/about.module";
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
		AboutModule,
		RouterModule,
		SharedModule,
	],
	providers: [ FooterService ],
})
export class FooterModule { }
