import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomContainerComponent } from './create-room-container.component';

describe('CreateRoomContainerComponent', () => {
  let component: CreateRoomContainerComponent;
  let fixture: ComponentFixture<CreateRoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoomContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
