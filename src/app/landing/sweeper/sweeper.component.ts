import { Component, Input, ElementRef, AfterContentInit, QueryList, ContentChildren } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { interval } from 'rxjs';

@Component({
	selector: 'app-sweeper',
	templateUrl: './sweeper.component.html',
	styleUrls: ['./sweeper.component.sass'],
})
export class SweeperComponent implements AfterContentInit {
	private inViewIndex = 0;

	@Input() leading: boolean;
	@Input() auto: boolean;

	@ContentChildren('sweepable') swipeList: QueryList<ElementRef<HTMLElement>>;

	constructor(private sanitizer: DomSanitizer) {
		interval(5000).subscribe(() => {
			if (this.auto) {
				this.inViewIndex = (this.inViewIndex + 1) % this.swipeList.length;
			}
		});
	}

	ngAfterContentInit() { }

	get swipeTranform(): SafeStyle {
		const factor: number = 100 / this.swipeList.length;
		const styleString = `translateY(-${factor * this.inViewIndex}%) translateY(-0.5em)`;

		return this.sanitizer.bypassSecurityTrustStyle(styleString);
	}
}
