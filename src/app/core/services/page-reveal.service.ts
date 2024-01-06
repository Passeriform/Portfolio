import type { ElementRef } from "@angular/core";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PageRevealService {
	private readonly endRevealElementSource$ = new BehaviorSubject<ElementRef<HTMLElement> | undefined>(undefined);
	private readonly startRevealElementSource$ = new BehaviorSubject<ElementRef<HTMLElement> | undefined>(undefined);

	public readonly endRevealElement$: Observable<ElementRef<HTMLElement> | undefined> = this.endRevealElementSource$.asObservable();
	public readonly startRevealElement$: Observable<ElementRef<HTMLElement> | undefined> = this.startRevealElementSource$.asObservable();

	public setEndRevealElement(endRevealElement: ElementRef<HTMLElement>): void {
		this.endRevealElementSource$.next(endRevealElement);
	}

	public setStartRevealElement(startRevealElement: ElementRef<HTMLElement>): void {
		this.startRevealElementSource$.next(startRevealElement);
	}
}
