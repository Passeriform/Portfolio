import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { HeaderModule } from "@app/header/header.module";
import { NamecardComponent } from "./namecard/namecard.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";
import { AboutResolver } from "./about-resolver.service";

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
	providers: [ AboutResolver ],
})
export class AboutModule { }
