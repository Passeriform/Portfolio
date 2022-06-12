import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";

@Injectable()
export class PageEndRevealService {
	private readonly pageEndRevealElementSource$ = new BehaviorSubject<HTMLElement | undefined>(undefined);

	public readonly pageEndRevealElement$: Observable<HTMLElement | undefined> = this.pageEndRevealElementSource$.asObservable();

	constructor() { }

	public setPageEndRevealElement(pageEndRevealElement: HTMLElement): void {
		this.pageEndRevealElementSource$.next(pageEndRevealElement);
	}
}
