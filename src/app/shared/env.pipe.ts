import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '@env/environment';

@Pipe({
	name: 'env',
})
export class EnvPipe implements PipeTransform {
	transform(variable: string): string {
		return environment[variable];
	}
}
