import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomViewComponent } from './create-room-view.component';

describe('CreateRoomViewComponent', () => {
  let component: CreateRoomViewComponent;
  let fixture: ComponentFixture<CreateRoomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoomViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
