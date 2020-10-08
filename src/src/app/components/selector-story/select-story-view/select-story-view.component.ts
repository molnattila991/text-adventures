import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StoryModel } from '@text-adventures/shared';

@Component({
  selector: 'app-select-story-view',
  template: `
 <div>
      <ul>
        <li *ngFor="let item of stories">
          {{item.id}} {{item.name}} <button (click)="selected.emit(item.id)">Select</button>
        </li>
      </ul>
    </div>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectStoryViewComponent {
  @Input() stories: StoryModel[] = [];
  @Output() selected: EventEmitter<string> = new EventEmitter();
  constructor() { }
}
