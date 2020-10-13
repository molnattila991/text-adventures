import { Observable } from 'rxjs';
import { HashMap } from '../models-be-connector/hash-map.interface';
import { StoryModel, StoryPageModel } from '../models-game/story-model.interface';

export interface CharacterStory {
    getStoriesForCharacter(): Observable<HashMap<StoryModel>>;
    getStoriesForCharacterAsArray(): Observable<StoryModel[]>;
    select(id: string): void;
    getSelectedItem(): Observable<StoryModel>;
}

export interface CharacterStoryItem {
    // selectStoryItem(id: string): void;
}