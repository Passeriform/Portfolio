import { Pipe } from "@angular/core";
import type { PipeTransform } from "@angular/core";

import { environment } from "@env/environment";

@Pipe({
	name: "environment",
})
export class EnvironmentPipe implements PipeTransform {
	transform(variable: string): boolean | number | string {
		return environment[variable];
	}
}
