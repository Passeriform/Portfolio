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
  public OverlayState = OverlayState;

  @HostBinding('class.blink') public blinkEnabled = true;

  public overlayState: OverlayState;

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
