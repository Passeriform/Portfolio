import type { WorkModel } from "../models/work.interface";

export type WorkDescriptionModel = Pick<WorkModel, "assets" | "brief" | "logo" | "subtitle" | "title">;
