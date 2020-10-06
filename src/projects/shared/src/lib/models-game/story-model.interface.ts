import { RequirementsModel } from "./requirements-model";
import { ActionEventModel } from "./action-event-model.interface";



export enum StoryPageOptionAppearance {
  showAlways, showIfRequirementsOK
}

export interface StoryPageOptionModel {
  text: string;
  destinationId: string;
  requirements: RequirementsModel;
  appear: StoryPageOptionAppearance;
}

export interface StoryPageModel {
  id: string;
  text: string;
  enemies?: string[];
  actionEvent: ActionEventModel;
  storyId: string;
  options: StoryPageOptionModel[]
}

export interface StoryModel {
  id?: string;
  name: string;
  description: string;
  requirements: RequirementsModel;
  storyPages?: string[];
  firstPageId?: string;
}
