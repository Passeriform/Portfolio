import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PageEndRevealService {
	private readonly pageEndRevealElementSource$ = new BehaviorSubject<HTMLElement | undefined>(undefined);

	public readonly pageEndRevealElement$: Observable<HTMLElement | undefined> = this.pageEndRevealElementSource$.asObservable();

	public setPageEndRevealElement(pageEndRevealElement: HTMLElement): void {
		this.pageEndRevealElementSource$.next(pageEndRevealElement);
	}
}
