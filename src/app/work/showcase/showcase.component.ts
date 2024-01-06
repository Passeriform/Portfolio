import type { OnInit } from "@angular/core";
import { AsyncPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";

import { IconUriPipe } from "@shared/pipes/icon-uri.pipe";
import { Orientation, Position } from "@shared/models/cardinals.interface";
import { TooltipDirective } from "@shared/tooltip/directives/tooltip.directive";
import { registry } from "@shared/models/registry.interface";
import { ScrollableComponent } from "@shared/scrollable/scrollable.component";
import { stopClickPropagation } from "@utility/events";

import type { WorkModel } from "../models/work.interface";
import { WorkService } from "../services/work.service";
import { EXPANDED_HEIGHT_THRESHOLD } from "./showcase.config";
import { RaisecardComponent } from "../raisecard/raisecard.component";
import { DynamicSearchComponent } from "../dynamic-search/dynamic-search.component";

@Component({
	imports: [
		AsyncPipe,
		DynamicSearchComponent,
		FontAwesomeModule,
		IconUriPipe,
		NgClass,
		NgFor,
		NgIf,
		ScrollableComponent,
		RaisecardComponent,
		TooltipDirective,
	],
	selector: "app-showcase",
	standalone: true,
	styleUrls: [ "./showcase.component.scss" ],
	templateUrl: "./showcase.component.html",
})
export class ShowcaseComponent implements OnInit {
	private readonly scrollResetSource$ = new Subject<void>();
	private readonly searchResetSource$ = new Subject<void>();

	public activeModel$: Observable<readonly WorkModel[]>;
	public cancelClick: (event: MouseEvent) => void = stopClickPropagation;
	public model$: Observable<readonly WorkModel[]>;
	public registry = registry;
	public scrollResetState$: Observable<void> = this.scrollResetSource$.asObservable();
	public searchResetState$: Observable<void> = this.searchResetSource$.asObservable();
	public showExpanded: boolean;

	/* eslint-disable @typescript-eslint/member-ordering */
	public readonly Orientation = Orientation;
	public readonly Position = Position;
	/* eslint-enable @typescript-eslint/member-ordering */

	@Output() public readonly selectionEvent: EventEmitter<WorkModel> = new EventEmitter<WorkModel>();

	@HostListener("window:resize")
	public onResize(): void {
		this.updateShowExpanded();
	}

	constructor(
			private readonly router: Router,
			private readonly workService: WorkService,
	) {
		this.updateShowExpanded();
	}

	ngOnInit() {
		this.model$ = this.workService.workCacheState$;
		this.activeModel$ = this.workService.workActiveState$ as Observable<WorkModel[]>;
	}

	public updateShowExpanded(): void {
		const bodyElement: HTMLBodyElement | null = document.querySelector("body");

		const windowHeight = bodyElement
			? window.innerHeight / Number.parseFloat(
				getComputedStyle(
					bodyElement,
				)["font-size"] as string,
			)
			: 0;

		this.showExpanded = windowHeight > EXPANDED_HEIGHT_THRESHOLD;
	}

	public setSelected(entry: WorkModel): void {
		this.selectionEvent.emit(entry);
	}

	public setTransform(updatedModel: readonly WorkModel[]): void {
		const modelTransform = (_: readonly WorkModel[]): readonly WorkModel[] => updatedModel;

		this.workService.setTransform(modelTransform);
	}

	public resetScroll(event: MouseEvent): void {
		this.scrollResetSource$.next();
		event.stopPropagation();
	}

	public resetSearch(event: MouseEvent): void {
		this.router.navigate([ "/explore" ]);
		this.searchResetSource$.next();
		event.stopPropagation();
	}
}
