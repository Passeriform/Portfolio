import { Component, Input, AfterContentInit } from '@angular/core';

export enum direction {
  DOWN,
  UP
}

export enum state {
  SHRINK,
  EXPAND
}

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements AfterContentInit {

  @Input() hero: string;
  @Input() srclogo: string;
  @Input() headerState: state = state.EXPAND;
  @Input() treeState: state = state.SHRINK;

  private state = state;
  private scrollDir: direction = direction.DOWN;
  private prevScroll: number = 0;


  constructor() { }

  ngAfterContentInit() {
    $(window).scroll(() => {

      this.treeState = state.SHRINK;

      var scrollVal = $(window).scrollTop();
      var landingReference = $('#landing').offset().top;
      var landingHeight = $('#landing').height();

      this.scrollDir = (scrollVal > this.prevScroll) ? direction.DOWN : direction.UP;

      this.prevScroll = scrollVal;

      if(this.scrollDir === direction.DOWN) {
        this.headerState = state.SHRINK
        window.scrollTo({
          top: landingReference + landingHeight,
          left: 0,
          behavior: 'smooth'
        });
        this.scrollDir = direction.UP;
      }
      else {
        this.headerState = state.EXPAND
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.scrollDir = direction.DOWN;
      }
      this.prevScroll = scrollVal;
    });
  }

  setTree() {
    if(this.headerState === state.SHRINK)
      this.treeState = state.EXPAND
  }

  unsetTree() {
    this.treeState = state.SHRINK
  }
}
