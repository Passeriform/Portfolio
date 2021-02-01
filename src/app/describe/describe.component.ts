import { Component, OnInit, Input } from '@angular/core';

import { WorkDescModel } from './work.interface';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.sass']
})
export class DescribeComponent implements OnInit {
  @Input() public model: WorkDescModel;

  constructor() { }

  ngOnInit() {
  }
}
