import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { ErrorService } from "./services/error.service";
import { ErrorComponent } from "./error.component";

@NgModule({
	declarations: [ ErrorComponent ],
	exports: [ ErrorComponent ],
	imports: [ SharedModule ],
	providers: [ ErrorService ],
})
export class ErrorModule { }
