import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import * as $ from 'jquery';

import { FetchService } from './services/fetch.service';
import { SplashStateService } from './services/splash-state.service';
import { TaggerService } from './services/tagger.service';
import { WorkStateService } from './services/work-state.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';

import { NavtabComponent } from './navtab/navtab.component';
import { NavtabDirective } from './navtab/navtab.directive';

import { ScrollableComponent } from './scrollable/scrollable.component';

import { LandingComponent } from './landing/landing.component';

import { ShowcaseComponent } from './showcase/showcase.component';

import { ExploreComponent } from './explore/explore.component';

import { DescribeComponent } from './describe/describe.component';

import { AboutComponent } from './about/about.component';

import { SweeperComponent } from './sweeper/sweeper.component';

import { CageGridComponent } from './cage-grid/cage-grid.component';
import { CageGridDirective } from './cage-grid/cage-grid.directive';

import { ListGroupComponent } from './listgroup/listgroup.component';

import { TooltipComponent } from './tooltip/tooltip.component';

import { OverlayComponent } from './overlay/overlay.component';
import { DynamicSearchComponent } from './dynamic-search/dynamic-search.component';

import { SocialGlyphsComponent } from './social-glyphs/social-glyphs.component';

import { RaisecardComponent } from './raisecard/raisecard.component';
import { IconUriPipe } from './icon-uri.pipe';
import { RetainPipe } from './retain.pipe';

// import { TreeComponent } from './tree/tree.component';
// import { NodeComponent } from './tree/node.component';
// import { PivotnavComponent } from './pivotnav/pivotnav.component';
// import { PItemComponent } from './pivotnav/pitem.component';
// import { CircularWaveComponent } from './circular-wave/circular-wave.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,

    HeaderComponent,

    NavtabComponent,
    NavtabDirective,

    ScrollableComponent,

    LandingComponent,

    ExploreComponent,

    ShowcaseComponent,

    DescribeComponent,

    AboutComponent,

    SweeperComponent,

    CageGridComponent,
    CageGridDirective,


    TooltipComponent,

    OverlayComponent,

    DynamicSearchComponent,

    SocialGlyphsComponent,

    RaisecardComponent,

    IconUriPipe,

    RetainPipe,
  ],
  providers: [
    FetchService,
    SplashStateService,
    TaggerService,
    WorkStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
