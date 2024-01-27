import type { OnInit } from "@angular/core";
import { AsyncPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import type { Observable } from "rxjs";
import { Subject, map } from "rxjs";

import { Orientation, Position } from "@shared/models/cardinals.interface";
import { TooltipDirective } from "@shared/tooltip/directives/tooltip.directive";
import { ScrollableComponent } from "@shared/scrollable/scrollable.component";
import type { Entity_Type } from "@graphql/generated/schema";
import { GetEntityIconGQL } from "@graphql/generated/schema";
import { extractEntityIcon } from "@graphql/transformers/entity.transformer";
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
		NgClass,
		NgFor,
		NgIf,
		NgTemplateOutlet,
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
	public repositoryIconUrl$: Observable<string | undefined>;
	public cancelClick: (event: MouseEvent) => void = stopClickPropagation;
	public model$: Observable<readonly WorkModel[]>;
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
			private readonly getEntityIcon: GetEntityIconGQL,
	) {
		this.updateShowExpanded();

		this.repositoryIconUrl$ = this.getEntityIcon.watch({ identifier: "github" }).valueChanges.pipe(map(extractEntityIcon));
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

	public hasTechStack(entry: WorkModel, type: Entity_Type): boolean {
		return entry.techStack.some((item) => item.type === type);
	}

	public getTechStackByType(entry: WorkModel, type: Entity_Type): WorkModel["techStack"] {
		return entry.techStack.filter((item) => item.type === type);
	}

	public getTechStackImage(type: Entity_Type): string {
		switch (type) {
			/* eslint-disable unicorn/switch-case-braces -- Allow single line cases with return statements */
			case "LANGUAGE": return "https://img.icons8.com/color/source-code";
			case "FRAMEWORK": return "https://img.icons8.com/color/administrative-tools";
			case "TOOL": return "https://img.icons8.com/color/toolbox";
			default: return "";
      /* eslint-enable unicorn/switch-case-braces */
		}
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
