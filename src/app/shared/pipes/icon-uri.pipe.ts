import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

import type { EntityIdentifierType } from "@shared/models/registry.interface";
import { registry } from "@shared/models/registry.interface";

@Pipe({
	name: "iconUri",
})
export class IconUriPipe implements PipeTransform {
	public transform(registryKey: string): string {
		return registry.get(registryKey as EntityIdentifierType)?.iconUrl ?? "";
	}
}
