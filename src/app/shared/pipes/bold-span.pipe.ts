import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
	name: "boldSpan",
})
export class BoldSpanPipe implements PipeTransform {
	constructor(private readonly sanitizer: DomSanitizer) { }

	transform(text: string, rawPattern: RegExp | string): string | null {
		const replacerPattern: RegExp = (typeof rawPattern === "string")
			? new RegExp(rawPattern, "gi")
			: rawPattern;

		const replacedText = text.replace(replacerPattern, "<b>$1</b>");

		return this.sanitizer.sanitize(SecurityContext.HTML, replacedText);
	}
}
