import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

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
  private OverlayState = OverlayState;

  @HostBinding('class.blink') private blinkEnabled = true;

  private overlayState: OverlayState;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() { }

  toggleOverlay(event: MouseEvent) {
    if (this.overlayState == OverlayState.SHOW) {
      this.overlayState = OverlayState.HIDE;
    }
    else {
      this.overlayState = OverlayState.SHOW;
    }
  }

  showOverlay(event: MouseEvent) {
    this.overlayState = OverlayState.SHOW;
  }

  hideOverlay(event: MouseEvent) {
      this.overlayState = OverlayState.HIDE;
  }

  disableBlink() {
    this.blinkEnabled = false;
  }
}
