import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

import { environment } from "@env/environment";

@Pipe({
	name: "environment",
	standalone: true,
})
export class EnvironmentPipe implements PipeTransform {
	transform(variable: keyof typeof environment): boolean | number | string {
		return environment[variable] as boolean | number | string;
	}
}
