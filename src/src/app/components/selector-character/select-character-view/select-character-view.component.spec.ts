import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCharacterViewComponent } from './select-character-view.component';

describe('SelectCharacterViewComponent', () => {
  let component: SelectCharacterViewComponent;
  let fixture: ComponentFixture<SelectCharacterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCharacterViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCharacterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
