import type { Work_Type } from "@graphql/generated/schema";
import type { WorkTransformer } from "./models/work.interface";

// TODO: Fetch filters from mongo dynamically.
export const routeFilters: readonly Lowercase<Work_Type>[] = [
	"product",
	"project",
	"design",
	"misc",
];

export const NO_TRANSFORM: WorkTransformer = (cache) => cache;
