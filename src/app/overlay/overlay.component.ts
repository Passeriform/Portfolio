import { Component, OnInit, HostBinding } from '@angular/core';

import { WorkService } from '../services/work.service';

enum OverlayState {
  HIDE,
  SHOW
}

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.sass'],
})
export class OverlayComponent implements OnInit {
  public OverlayState = OverlayState;
  public overlayState: OverlayState;

  @HostBinding('class.blink') public blinkEnabled = true;

  constructor(public workService: WorkService) { }

  ngOnInit() {
    this.workService.workSelectedState$.subscribe((model) => {
      if (model) {
        this.blinkEnabled = false;
      }
    });
  }

  toggleOverlay() {
    if (this.overlayState === OverlayState.SHOW) {
      this.overlayState = OverlayState.HIDE;
    } else {
      this.overlayState = OverlayState.SHOW;
    }
  }

  showOverlay() {
    this.overlayState = OverlayState.SHOW;
  }

  hideOverlay() {
      this.overlayState = OverlayState.HIDE;
  }

  disableBlink() {
    this.blinkEnabled = false;
  }
}
