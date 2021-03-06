import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterStory, CharacterStoryItem } from '@text-adventures/shared';

@Component({
  selector: 'app-select-story-container',
  template: `
    <app-select-story-view 
      [stories]="storyService.getStoriesForCharacterAsArray()|async"
      (selected)="select($event)">
    </app-select-story-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectStoryContainerComponent {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) public storyService: CharacterStory,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) public storyItemService: CharacterStoryItem
  ) { }

  select(id: string) {
    this.storyService.select(id);
  }
}
