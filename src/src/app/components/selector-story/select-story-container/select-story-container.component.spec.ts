import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStoryContainerComponent } from './select-story-container.component';

describe('SelectStoryContainerComponent', () => {
  let component: SelectStoryContainerComponent;
  let fixture: ComponentFixture<SelectStoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStoryContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
