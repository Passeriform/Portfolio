import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { DescribeComponent } from "./describe/describe.component";
import { DynamicSearchComponent } from "./dynamic-search/dynamic-search.component";
import { RaisecardComponent } from "./raisecard/raisecard.component";
import { ShowcaseComponent } from "./showcase/showcase.component";
import { TechStackComponent } from "./tech-stack/tech-stack.component";
import { TaggerService } from "./services/tagger.service";
import { WorkService } from "./services/work.service";
import { WorkRoutingModule } from "./work-routing.module";
import { WorkComponent } from "./work.component";
import { WorkResolver } from "./work-resolver.service";

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
		SharedModule,
		WorkRoutingModule,
	],
	providers: [
		TaggerService,
		WorkResolver,
		WorkService,
	],
})
export class WorkModule { }
