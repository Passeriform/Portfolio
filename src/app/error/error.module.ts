import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { ErrorService } from "./services/error.service";
import { ErrorComponent } from "./error.component";

@NgModule({
	exports: [ ErrorComponent ],
	imports: [
		ErrorComponent,
		SharedModule,
	],
	providers: [ ErrorService ],
})
export class ErrorModule { }
