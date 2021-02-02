import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WordScore } from './dynamic-search.interface';

import { FuzzyAnalyzer } from './fuzzy-analyzer';

@Component({
  selector: 'app-dynamic-search',
  templateUrl: './dynamic-search.component.html',
  styleUrls: ['./dynamic-search.component.sass'],
  providers: [FuzzyAnalyzer]
})
export class DynamicSearchComponent implements OnInit {
  @Input() model: WordScore[];
  @Output() propagate: EventEmitter<WordScore[]> = new EventEmitter();

  public queryString: string;

  constructor(private fuzzyAnalyzer: FuzzyAnalyzer) {
    this.queryString = '';
  }

  ngOnInit() {
  }

  public applyFilter(): void {
    if (!this.queryString) { return; }

    this.model = this.model
      .map(entry => {
        entry.score = entry.tags
          .map((word: string) => {
            return this.fuzzyAnalyzer.scoreValue(word, this.queryString);
          })
          .reduce((minScore: number, currScore: number) => {
            return Math.max(minScore, currScore);
          });
        return entry;
      })
      .sort((a, b) => {
        // TODO: Consider making logic more understandable
        return (
          ((a.score > b.score) && -1) ||
          ((a.score < b.score) && 1) ||
          0
        );
      });
    this.propagate.emit(this.model);
  }
}
