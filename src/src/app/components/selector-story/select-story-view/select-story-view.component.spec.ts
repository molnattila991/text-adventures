import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStoryViewComponent } from './select-story-view.component';

describe('SelectStoryViewComponent', () => {
  let component: SelectStoryViewComponent;
  let fixture: ComponentFixture<SelectStoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
