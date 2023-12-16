import { frameworksRegistry } from "./frameworks.registry.interface";
import { githubEventsRegistry } from "./github-events.registry.interface";
import { languagesRegistry } from "./languages.registry.interface";
import { licensesRegistry } from "./licenses.registry.interface";
import { socialsRegistry } from "./socials.registry.interface";
import { toolsRegistry } from "./tools.registry.interface";
import { workTypesRegistry } from "./work-types.registry.interface";

// TODO: Add expect-type test to ensure registry has at least all entries from generated schema

/* eslint-disable functional/prefer-immutable-types */
export const registry = {
	...githubEventsRegistry,
	...workTypesRegistry,
	...licensesRegistry,
	...languagesRegistry,
	...frameworksRegistry,
	...toolsRegistry,
	...socialsRegistry,
} as const;
/* eslint-enable functional/prefer-immutable-types */

export type EntityIdentifier = keyof typeof registry;

export type EntityIdentifierWithRegistryEntry = {
	[K in keyof typeof registry]: (typeof registry)[K] extends { wikiTitle: string } ? K : never
}[keyof typeof registry];

export const isRegistryKey = (maybeRegistryKey: string): maybeRegistryKey is keyof typeof registry => maybeRegistryKey in registry;

export const hasWikiEntry = (entity: EntityIdentifier): entity is EntityIdentifierWithRegistryEntry => "wikiTitle" in registry[entity];
