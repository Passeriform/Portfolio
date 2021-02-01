import { Component, OnInit, Input } from '@angular/core';

import { SocialGlyphModel } from './social-glyphs.interface';

@Component({
  selector: 'app-social-glyphs',
  templateUrl: './social-glyphs.component.html',
  styleUrls: ['./social-glyphs.component.sass']
})
export class SocialGlyphsComponent implements OnInit {
  @Input() model: SocialGlyphModel[];
  // TODO: Add dynamic palette support
  @Input() invert = false;

  constructor() { }

  ngOnInit() { }
}
