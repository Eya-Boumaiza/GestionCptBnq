import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifGerantComponent } from './notif-gerant.component';

describe('NotifGerantComponent', () => {
  let component: NotifGerantComponent;
  let fixture: ComponentFixture<NotifGerantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifGerantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
