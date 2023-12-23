import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

import { isRegistryKey, registry } from "../models/registry.interface";

@Pipe({
	name: "iconUri",
	standalone: true,
})
export class IconUriPipe implements PipeTransform {
	public transform(registryKey: string) {
		return isRegistryKey(registryKey) ? registry[registryKey].iconUrl : "";
	}
}
