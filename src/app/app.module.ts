import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RaisecardComponent } from './raisecard/raisecard.component';
import { RaisecardGroupComponent } from './raisecard/raisecard-group.component';

import { TreeComponent } from './tree/tree.component';
import { NodeComponent } from './tree/node.component';

import { TabComponent } from './header/tab.component';
import { HeaderComponent } from './header/header.component';

import { PItemComponent } from './pivotnav/pitem.component';
import { PivotnavComponent } from './pivotnav/pivotnav.component';
import { CircularWaveComponent } from './circular-wave/circular-wave.component';

@NgModule({
  declarations: [
    AppComponent,

    RaisecardComponent,
    RaisecardGroupComponent,

    TreeComponent,
    NodeComponent,

    HeaderComponent,
    TabComponent,

    PivotnavComponent,
    PItemComponent,
    CircularWaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
