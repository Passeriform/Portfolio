import { Pipe } from "@angular/core";
import type { PipeTransform } from "@angular/core";

import { EntityIdentifier, registry } from "@shared/models/registry.interface";

@Pipe({
	name: "iconUri",
})
export class IconUriPipe implements PipeTransform {
	public transform(iconstr: string): string {
		return registry.find(
			(entry) => entry.identifier === EntityIdentifier[iconstr],
		)?.iconUrl ?? "";
	}
}
