import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomContainerComponent } from './list-room-container.component';

describe('ListRoomContainerComponent', () => {
  let component: ListRoomContainerComponent;
  let fixture: ComponentFixture<ListRoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoomContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
