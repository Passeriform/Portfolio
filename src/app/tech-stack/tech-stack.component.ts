import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.sass']
})
export class TechStackComponent implements OnInit {
  private tooltipShownFor: string;

  @Input() private model: object;

  constructor() { }

  ngOnInit() {
  }

  showTooltip(elem: string) {
    this.tooltipShownFor = elem;
  }

  unsetTooltip() {
    this.tooltipShownFor = null;
  }

}
