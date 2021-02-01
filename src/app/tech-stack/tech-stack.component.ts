import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.sass']
})
export class TechStackComponent implements OnInit {
  public tooltipShownFor: string;

  // TODO: object must be replaced
  @Input() public model: object[];

  constructor() { }

  ngOnInit() { }
}
