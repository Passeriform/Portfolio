import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Project } from '../common/global';

import { ProjectParserService } from '../services/project-parser.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.sass'],
  providers: [ ProjectParserService ]
})
export class ShowcaseComponent implements OnInit, AfterViewInit {
  private preloadMarker: string;
  public model: Array<any>;

  @ViewChild('cardscroller', {static: false}) cardChild;

  constructor(private route: ActivatedRoute, private projectParser: ProjectParserService) {
  }

  ngOnInit() {
    this.preloadMarker = this.route.snapshot.data.marker;
    this.projectParser.modelObs.subscribe(model => {
      model.map(entry => {
        entry.showLanguagesTooltip = false;
        entry.showFrameworksTooltip = false;
        entry.showToolsTooltip = false;
      });
      this.model = this.applyPreload(model);
    });
  }

  ngAfterViewInit() {
  }

  applyPreload(model) {
    if (this.preloadMarker === undefined) {
      return model;
    }

    const modModel = model.filter(entry => this.preloadMarker === entry.type);
    return modModel;
  }

  update(model: Array<any>) {
    this.projectParser.updateModel(this.applyPreload(model));
    this.cardChild.pageReset();
  }

  showLanguages(entry) {
    entry.showLanguagesTooltip = true;
  }
  showFrameworks(entry) {
    entry.showFrameworksTooltip = true;
  }
  showTools(entry) {
    entry.showToolsTooltip = true;
  }
  hideLanguages(entry) {
    entry.showLanguagesTooltip = false;
  }
  hideFrameworks(entry) {
    entry.showFrameworksTooltip = false;
  }
  hideTools(entry) {
    entry.showToolsTooltip = false;
  }

  metaClick(event) {
    event.stopPropagation();
  }
}
