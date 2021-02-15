import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkComponent } from './work.component';
import { WorkResolver } from './work-resolver.service';
import { WorkRoutingModule } from './work-routing.module';
import { ShowcaseComponent } from './showcase/showcase.component';
import { DescribeComponent } from './describe/describe.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { DynamicSearchComponent } from './dynamic-search/dynamic-search.component';
import { RaisecardComponent } from './raisecard/raisecard.component';
import { MapExternalPipe } from './tech-stack/map-external.pipe';
import { WorkService } from './services/work.service';
import { TaggerService } from './services/tagger.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		// RouterModule,
		SharedModule,
		WorkRoutingModule,
	],
	declarations: [
		WorkComponent,
		ShowcaseComponent,
		DescribeComponent,
		TechStackComponent,
		DynamicSearchComponent,
		RaisecardComponent,
		MapExternalPipe,
	],
	providers: [
		WorkResolver,
		WorkService,
		TaggerService,
	],
	exports: [
		ShowcaseComponent,
		DescribeComponent,
		TechStackComponent,
		DynamicSearchComponent,
		RaisecardComponent,
	],
})
export class WorkModule { }
