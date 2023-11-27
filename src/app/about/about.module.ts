import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { HeaderModule } from "@app/header/header.module";

import { NamecardComponent } from "./namecard/namecard.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { AboutRoutingModule } from "./routes/about-routing.module";
import { AboutComponent } from "./about.component";

@NgModule({
	declarations: [
		AboutComponent,
		ContactFormComponent,
		NamecardComponent,
	],
	imports: [
		AboutRoutingModule,
		HeaderModule,
		SharedModule,
	],
})
export class AboutModule { }
