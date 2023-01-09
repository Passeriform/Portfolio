import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PageRevealService {
	private readonly endRevealElementSource$ = new BehaviorSubject<HTMLElement | undefined>(undefined);
	private readonly startRevealElementSource$ = new BehaviorSubject<HTMLElement | undefined>(undefined);

	public readonly endRevealElement$: Observable<HTMLElement | undefined> = this.endRevealElementSource$.asObservable();
	public readonly startRevealElement$: Observable<HTMLElement | undefined> = this.startRevealElementSource$.asObservable();

	public setEndRevealElement(endRevealElement: HTMLElement): void {
		this.endRevealElementSource$.next(endRevealElement);
	}

	public setStartRevealElement(startRevealElement: HTMLElement): void {
		this.startRevealElementSource$.next(startRevealElement);
	}
}
