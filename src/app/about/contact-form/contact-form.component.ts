import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
	imports: [ FormsModule ],
	selector: "app-contact-form",
	standalone: true,
	styleUrls: [ "./contact-form.component.scss" ],
	templateUrl: "./contact-form.component.html",
})
export class ContactFormComponent { }
