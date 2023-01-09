import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({
	name: "unionArray",
})
export class UnionArrayPipe implements PipeTransform {
	public transform<T extends readonly unknown[]>(value: T): readonly T[number][] {
		return value as readonly T[number][];
	}
}
