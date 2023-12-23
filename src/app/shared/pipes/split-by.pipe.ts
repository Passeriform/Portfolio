import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({
	name: "splitBy",
	standalone: true,
})
export class SplitByPipe implements PipeTransform {
	transform(input: string, delimiter: string): string[] {
		const chunks: string[] = input.split(delimiter);

		return chunks;
	}
}
