import { Injectable } from "@angular/core";

import type { Framework, Language, License, Tool } from "@shared/models/registry.interface";

import type { WorkModel } from "../work.interface";
import { nonKeywords } from "./tagger.interface";

@Injectable()
export class TaggerService {
	public readonly getKeywords = (textstr: string): readonly string[] => {
		const keyArray: string[] = textstr.split(/[\s"(),./:;?\\\-]+/);

		return keyArray.filter(
			(key: string) => key && !nonKeywords.includes(key.toLowerCase()),
		);
	};

	public readonly appendTags = (modelList: readonly WorkModel[]): readonly WorkModel[] => modelList.map(
		(model: WorkModel) => {
			model.tags.push(
				model.type.toString(),
				...this.getKeywords(model.title),
				...this.getKeywords(model.subtitle),
				...this.getKeywords(model.description),
				...model.license.map((license: License) => license.toString()),
				...model.languages.map((language: Language) => language.toString()),
				...model.frameworks.map((framework: Framework) => framework.toString()),
				...model.tools.map((tool: Tool) => tool.toString()),
			);

			return model;
		},
	);
}
