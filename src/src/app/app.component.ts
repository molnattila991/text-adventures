import { Component } from '@angular/core';
import { ItemStoreService } from '@text-adventures/store';
import { AbilityStoreService } from 'projects/store/src/lib/ability-store.service';
import { CharacterStoreService } from 'projects/store/src/lib/character-store.service';
import { StoryStoreService } from 'projects/store/src/lib/story-store.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    service1: ItemStoreService,
    service2: AbilityStoreService,
    service3: CharacterStoreService,
    service4: StoryStoreService) {

    // merge(service1.getHash(), service2.getHash(), service3.getHash(), service4.getHash()).subscribe(
    //   h => console.log("hash: ", h)
    // )

    // merge(service1.getSelectList(), service2.getSelectList(), service3.getSelectList(), service4.getSelectList()).subscribe(
    //   h => console.log("selectList:", h)
    // )

  }
  title = 'text-adventures';
}
