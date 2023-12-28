import { NgModule } from "@angular/core";

import { NamecardComponent } from "./namecard/namecard.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { AboutComponent } from "./about.component";

@NgModule({
	imports: [
		AboutComponent,
		ContactFormComponent,
		NamecardComponent,
	],
})
export class AboutModule { }
