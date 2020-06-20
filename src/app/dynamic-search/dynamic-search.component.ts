import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { FuzzyAnalyzer, FuzzySegment} from './fuzzy-analyzer';

@Component({
  selector: 'app-dynamic-search',
  templateUrl: './dynamic-search.component.html',
  styleUrls: ['./dynamic-search.component.sass'],
  providers: [ FuzzyAnalyzer ]
})
export class DynamicSearchComponent implements OnInit {
  @Input() model: Array<any>;
  @Output() propagate = new EventEmitter<any>();

  public queryString: string;

  constructor(private fuzzyAnalyzer: FuzzyAnalyzer) {
    this.queryString = '';
  }

  ngOnInit() {
  }

  public applyFilter(): void {
    if ( ! this.queryString ) { return; }

    this.model = this.model
      .map(entry => {
        entry.score = entry.tags
          .map(word => {
            return this.fuzzyAnalyzer.scoreValue(word, this.queryString);
          })
          .reduce((minScore, currScore) => {
            return Math.max(minScore, currScore);
          });
        return entry;
        })
        .sort((a, b) => {
          return(
            ((a.score > b.score) && -1) ||
            ((a.score < b.score) && 1) ||
            0
          );
        });
    this.propagate.emit(this.model);
  }
}
