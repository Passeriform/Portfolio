import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HeaderModule } from "@app/header/header.module";
import { SharedModule } from "@app/shared/shared.module";

import { DescribeComponent } from "./describe/describe.component";
import { DynamicSearchComponent } from "./dynamic-search/dynamic-search.component";
import { RaisecardComponent } from "./raisecard/raisecard.component";
import { ShowcaseComponent } from "./showcase/showcase.component";
import { TechStackComponent } from "./tech-stack/tech-stack.component";
import { WorkService } from "./services/work.service";
import { WorkRoutingModule } from "./routes/work-routing.module";
import { WorkComponent } from "./work.component";

@NgModule({
	declarations: [
		DescribeComponent,
		DynamicSearchComponent,
		RaisecardComponent,
		ShowcaseComponent,
		TechStackComponent,
		WorkComponent,
	],
	exports: [
		DescribeComponent,
		DynamicSearchComponent,
		RaisecardComponent,
		ShowcaseComponent,
		TechStackComponent,
	],
	imports: [
		FontAwesomeModule,
		HeaderModule,
		SharedModule,
		WorkRoutingModule,
	],
	providers: [ WorkService ],
})
export class WorkModule { }
