import type { ElementRef, TemplateRef } from "@angular/core";

import type { Position } from "../models/cardinals.interface";

export interface TooltipTemplateConfig {
	contentPadding: boolean;
	corner: boolean;
	invert: boolean;
	left: number;
	position: Position;
	show: boolean;
	template: TemplateRef<ElementRef> | undefined;
	top: number;
}
