import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterViewComponent } from './create-character-view.component';

describe('CreateCharacterViewComponent', () => {
  let component: CreateCharacterViewComponent;
  let fixture: ComponentFixture<CreateCharacterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCharacterViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharacterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
