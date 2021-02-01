import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.sass']
})
export class BadgeComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }
}
