import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterClientsComponent } from './consulter-clients.component';

describe('ConsulterClientsComponent', () => {
  let component: ConsulterClientsComponent;
  let fixture: ComponentFixture<ConsulterClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
