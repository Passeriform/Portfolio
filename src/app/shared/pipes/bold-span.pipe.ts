import type { PipeTransform } from "@angular/core";
import { Pipe, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
	name: "boldSpan",
	standalone: true,
})
export class BoldSpanPipe implements PipeTransform {
	constructor(private readonly sanitizer: DomSanitizer) { }

	transform(text: string, rawPattern: RegExp | string): string | null {
		const replacerPattern: RegExp = typeof rawPattern === "string"
			? new RegExp(rawPattern, "gi")
			: rawPattern;

		const replacedText = text.replace(replacerPattern, "<b>$1</b>");

		return this.sanitizer.sanitize(SecurityContext.HTML, replacedText);
	}
}
