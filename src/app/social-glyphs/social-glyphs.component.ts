import { Component, OnInit, Input } from '@angular/core';

import { IconUriPipe } from '../icon-uri.pipe';

@Component({
  selector: 'app-social-glyphs',
  templateUrl: './social-glyphs.component.html',
  styleUrls: ['./social-glyphs.component.sass']
})
export class SocialGlyphsComponent implements OnInit {
  @Input() model: Array<any>;
  @Input() invert = false;

  constructor() {
  }

  ngOnInit() {
  }
}
