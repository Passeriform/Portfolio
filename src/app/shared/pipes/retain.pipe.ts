import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({
	name: "retain",
	standalone: true,
})
export class RetainPipe implements PipeTransform {
	transform<T extends Record<PropertyKey, unknown>, P extends keyof T>(inObject: T, ...keepProperties: readonly P[]): Pick<T, P> {
		return Object.fromEntries(Object.entries(inObject).filter(
			([ attrib ]) => keepProperties.includes(attrib as P),
		)) as Pick<T, P>;
	}
}
