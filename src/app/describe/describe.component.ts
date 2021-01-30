import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.sass']
})
export class DescribeComponent implements OnInit {
  @Input() public model: any;

  constructor() { }

  ngOnInit() {
  }
}
