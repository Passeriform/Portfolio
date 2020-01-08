import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { RaisecardComponent } from './raisecard.component';

@Component({
  selector: 'raisecard-group',
  templateUrl: './raisecard-group.component.html',
  styleUrls: ['./raisecard-group.component.sass']
})
export class RaisecardGroupComponent implements AfterContentInit {
  @ContentChildren(RaisecardComponent)
  cards: QueryList<RaisecardComponent>;

  ngAfterContentInit() {
    this.cards.toArray()[0].focussed = true;
    this.cards.toArray().forEach((card) => {
      card.toggle.subscribe(() => {
        this.focusCard(card);
      });
    });
  }

  focusCard(card: RaisecardComponent) {
    this.cards.toArray().forEach((t) => t.focussed = false);
    card.focussed = true;
  }
}
