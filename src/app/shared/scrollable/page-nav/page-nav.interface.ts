import type { ElementRef, QueryList, SimpleChanges } from "@angular/core";

export type PageNavChanges = SimpleChanges & {
	activePage?: number;
	items?: QueryList<ElementRef>;
};
