import { Component, Input, AfterViewInit, ViewChild, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Project } from '../common/global';

import { WorkService } from '../services/work.service';
import { TaggerService } from '../services/tagger.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.sass'],
  providers: [ WorkService, TaggerService ]
})

export class ShowcaseComponent implements OnInit {
  public model: Array<any>;
  public windowHeight: number;

  @Input() private preloadMarker: string;

  @ViewChild('cardscroller', {static: false}) cardChild;

  @HostListener('window:resize')
  onResize() {
    this.windowHeight = window.innerHeight / parseFloat(
      getComputedStyle(
        document.querySelector('body')
      )['font-size']
    );
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public workService: WorkService) {
      this.windowHeight = window.innerHeight / parseFloat(
        getComputedStyle(
          document.querySelector('body')
        )['font-size']
      );
    }

  ngOnInit() {
    if (this.preloadMarker !== '') {
      this.workService.setFilter((entity) => entity.type == this.preloadMarker);
    }

    this.workService.workActiveState$.subscribe((model) => {
      this.model = model;

      if (this.model === undefined) {
        this.router.navigate(['/explore']);
      }
    });
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

  setSelected(entry: object) {
    this.workService.setSelected(entry);
  }

  cancelClick(event) {
    event.stopPropagation();
  }
}
