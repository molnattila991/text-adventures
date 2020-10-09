import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerContainerComponent } from './single-player-container.component';

describe('SinglePlayerContainerComponent', () => {
  let component: SinglePlayerContainerComponent;
  let fixture: ComponentFixture<SinglePlayerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlayerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
