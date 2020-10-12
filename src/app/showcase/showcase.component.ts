import { Component, Input, AfterViewInit, ViewChild, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Project } from '../common/global';

import { WorkStateService } from '../services/work-state.service';
import { TaggerService } from '../services/tagger.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.sass'],
  providers: [ TaggerService ]
})

export class ShowcaseComponent implements OnInit, AfterViewInit {
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
    public workState: WorkStateService) { }

  ngOnInit() {
    if (this.preloadMarker !== '') {
      this.workState.setFilter((entity) => entity.type == this.preloadMarker);
    }

    this.workState.workActiveState$.subscribe((model) => {
      this.model = model;

      if (this.model === undefined) {
        this.router.navigate(['/explore']);
      }
    });

    this.windowHeight = window.innerHeight / parseFloat(
      getComputedStyle(
        document.querySelector('body')
      )['font-size']
    );
  }

  ngAfterViewInit() {
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
    this.workState.setSelected(entry);
  }

  cancelClick(event) {
    event.stopPropagation();
  }
}
