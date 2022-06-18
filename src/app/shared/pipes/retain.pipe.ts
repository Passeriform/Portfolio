import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({
	name: "retain",
})
export class RetainPipe implements PipeTransform {
	transform(inObject: Record<string, unknown>, ...keepProperties: readonly string[]): Record<string, unknown> {
		const outObject: Record<string, unknown> = { };

		Object.keys(inObject).forEach(
			(key: string) => {
				if (keepProperties.includes(key)) {
					outObject[key] = inObject[key];
				}
			},
		);

		return outObject;
	}
}
