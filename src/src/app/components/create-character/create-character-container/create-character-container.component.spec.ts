import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterContainerComponent } from './create-character-container.component';

describe('CreateCharacterContainerComponent', () => {
  let component: CreateCharacterContainerComponent;
  let fixture: ComponentFixture<CreateCharacterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCharacterContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharacterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
