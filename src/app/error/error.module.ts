import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { ErrorComponent } from "./error.component";
import { ErrorService } from "./error.service";

@NgModule({
	declarations: [ ErrorComponent ],
	exports: [ ErrorComponent ],
	imports: [
		// RouterModule,
		SharedModule,
	],
	providers: [ ErrorService ],
})
export class ErrorModule { }
