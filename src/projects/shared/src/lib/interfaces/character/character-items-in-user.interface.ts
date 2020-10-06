import { Observable } from "rxjs";
import { InventoryModel } from "../../models-game/item-model";

export interface CharacterItemsInUse {
    getInventory(): Observable<Partial<InventoryModel>>;
}