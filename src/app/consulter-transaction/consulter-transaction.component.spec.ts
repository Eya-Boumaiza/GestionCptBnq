import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterTransactionComponent } from './consulter-transaction.component';

describe('ConsulterTransactionComponent', () => {
  let component: ConsulterTransactionComponent;
  let fixture: ComponentFixture<ConsulterTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
