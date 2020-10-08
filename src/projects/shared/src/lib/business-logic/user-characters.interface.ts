import { Observable } from 'rxjs';
import { HashMap } from '../models-be-connector/hash-map.interface';
import { CharacterPlayerModel } from '../models-game/character-model';

export interface UserCharacters {
    getCharactersForUser(): Observable<HashMap<CharacterPlayerModel>>;
    getCharactersForUserAsArray(): Observable<CharacterPlayerModel[]>;
    selectCharacter(id: string): void;
    getSelectedCharacter(): Observable<CharacterPlayerModel>
}