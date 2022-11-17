import type { WorkModel } from "./work.interface";

// TODO: Fetch filters from mongo dynamically.
export const routeFilters: string[] = [
	"product",
	"project",
	"design",
	"misc",
];

export const NO_TRANSFORM = (_: WorkModel[]): unknown[] => _ as unknown[];
