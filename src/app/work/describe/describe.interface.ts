import type { WorkModel } from "../models/work.interface";

export type WorkDescriptionModel = Pick<WorkModel, "description" | "logo" | "screenshots" | "subtitle" | "title">;
