import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import * as $ from 'jquery';

import { FetchService } from './services/fetch.service';
import { SplashStateService } from './services/splash-state.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';

import { NavtabComponent } from './navtab/navtab.component';
import { NavtabDirective } from './navtab/navtab.directive';

import { ScrollableComponent } from './scrollable/scrollable.component';

import { LandingComponent } from './landing/landing.component';

import { ShowcaseComponent } from './showcase/showcase.component';

import { DescribeComponent } from './describe/describe.component';

import { AboutComponent } from './about/about.component';

import { SweeperComponent } from './sweeper/sweeper.component';

import { CageGridComponent } from './cage-grid/cage-grid.component';
import { CageGridDirective } from './cage-grid/cage-grid.directive';

import { DynamicSearchComponent } from './dynamic-search/dynamic-search.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SocialGlyphsComponent } from './social-glyphs/social-glyphs.component';

import { RaisecardComponent } from './raisecard/raisecard.component';
import { IconUriPipe } from './icon-uri.pipe';

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

    ShowcaseComponent,

    DescribeComponent,

    AboutComponent,

    SweeperComponent,

    CageGridComponent,
    CageGridDirective,

    DynamicSearchComponent,

    TooltipComponent,

    SocialGlyphsComponent,

    RaisecardComponent,

    IconUriPipe
  ],
  providers: [
    FetchService,
    SplashStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
