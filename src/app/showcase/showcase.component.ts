import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Project } from '../common/global';

import { FetchService } from '../services/fetch.service';
import { TaggerService } from '../services/tagger.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.sass'],
  providers: [ TaggerService ]
})
export class ShowcaseComponent implements OnInit, AfterViewInit {
  private preloadMarker: string;
  public model: Array<any>;

  @ViewChild('cardscroller', {static: false}) cardChild;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetcher: FetchService,
    private tagger: TaggerService) { }

  ngOnInit() {
    this.preloadMarker = this.route.snapshot.data.marker || '';

    let callURL;

    if (this.preloadMarker) {
      callURL = `https://passeriform-portfolio-api.herokuapp.com/work/filter/type/${this.preloadMarker}`;
    } else {
      callURL = 'https://passeriform-portfolio-api.herokuapp.com/work';
    }

    this.fetcher.getResponse(callURL).subscribe(model => {
      this.model = this.tagger.appendTags(model);

      if (this.model === undefined) {
        this.router.navigate(['/explore']);
      }

      this.model.map(entry => {
        entry.showLanguagesTooltip = false;
        entry.showFrameworksTooltip = false;
        entry.showToolsTooltip = false;
      });
    });
  }

  ngAfterViewInit() {
  }

  update(model: Array<any>) {
    this.model = model;
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

  cancelClick(event) {
    event.stopPropagation();
  }
}
