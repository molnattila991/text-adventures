import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCharacterContainerComponent } from './select-character-container.component';

describe('SelectCharacterContainerComponent', () => {
  let component: SelectCharacterContainerComponent;
  let fixture: ComponentFixture<SelectCharacterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCharacterContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCharacterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
