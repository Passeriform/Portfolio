/// Angular imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// JQuery // TODO: Eliminate
import * as $ from 'jquery';

/// App component and routing
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/// Routable Pages
import { LandingComponent } from './landing/landing.component';
import { ExploreComponent } from './explore/explore.component';
import { AboutComponent } from './about/about.component';

/// Components (In orders of specificity, relationship)
import { ScrollableComponent } from './scrollable/scrollable.component';

import { HeaderComponent } from './header/header.component';

import { NavtabComponent } from './navtab/navtab.component';
import { NavtabDirective } from './navtab/navtab.directive';

import { CageGridComponent } from './cage-grid/cage-grid.component';
import { CageGridDirective } from './cage-grid/cage-grid.directive';

import { TooltipComponent } from './tooltip/tooltip.component';

import { ListGroupComponent } from './listgroup/listgroup.component';

import { OverlayComponent } from './overlay/overlay.component';

import { RaisecardComponent } from './raisecard/raisecard.component';

// Landing
import { SweeperComponent } from './sweeper/sweeper.component';

// Explore
import { ShowcaseComponent } from './showcase/showcase.component';

import { DescribeComponent } from './describe/describe.component';

import { DynamicSearchComponent } from './dynamic-search/dynamic-search.component';

// About
import { SocialGlyphsComponent } from './social-glyphs/social-glyphs.component';

/// Services
import { FetchService } from './services/fetch.service';
import { SplashStateService } from './services/splash-state.service';
import { TaggerService } from './services/tagger.service';
import { WorkStateService } from './services/work-state.service';

/// Pipes
import { IconUriPipe } from './icon-uri.pipe';
import { RetainPipe } from './retain.pipe';

/// Module registration
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

    ListGroupComponent,

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
